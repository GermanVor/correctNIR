import React from "react";
import { RequestName } from "../common/requestName";

export enum FetchDataStatus {
    Initial,
    Loading,
    Loaded,
    Error,
}

type FetchDataType<DataType> = {
    data?: DataType;
    error?: {
        statusText: string;
    };
    status: FetchDataStatus;
};

export const useFetchData = <RequestResponse = void>(
    requestType: RequestName | string,
    silent?: boolean
): [FetchDataType<RequestResponse>, (_?: Object) => Promise<FetchDataType<RequestResponse>>] => {
    const [fetchState, setFetchState] = React.useState<FetchDataType<RequestResponse>>({
        status: FetchDataStatus.Initial,
    });

    const fetchData = React.useCallback(
        (body?: Object) => {
            if (!silent) setFetchState({ status: FetchDataStatus.Loading });

            return fetch(
                requestType,
                body
                    ? {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json;charset=utf-8",
                          },
                          body: JSON.stringify(body),
                      }
                    : undefined
            )
                .then<FetchDataType<RequestResponse>>((response) => {
                    if (response.ok) {
                        return response.json().then((data: RequestResponse) => ({
                            status: FetchDataStatus.Loaded,
                            data,
                        }));
                    } else {
                        return {
                            status: FetchDataStatus.Error,
                            error: {
                                statusText: response.statusText,
                            },
                        };
                    }
                })
                .catch(() => ({
                    status: FetchDataStatus.Error,
                    error: {
                        statusText: "inner error",
                    },
                }))
                .then((state) => {
                    setFetchState(state);
                    return state;
                });
        },
        [requestType]
    );

    return [fetchState, fetchData];
};

type RefresherType = {
    timeout: number;
    callback: () => any;

    readonly start: () => any;
    readonly stop: () => any;
};
export const useRefresher = (callback: () => any = () => {}): RefresherType => {
    const intervalId = React.useRef<NodeJS.Timer>();

    const refresher = React.useRef<RefresherType>({
        timeout: 1500,
        callback,
        start: () => {
            refresher.current.callback();

            intervalId.current = setInterval(() => {
                refresher.current.callback();
            }, refresher.current.timeout);
        },
        stop: () => {
            if (intervalId.current) clearInterval(intervalId.current);
        },
    });

    React.useEffect(() => () => refresher.current.stop(), []);

    return refresher.current;
};
