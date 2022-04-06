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
    requestType: RequestName | string
): [
    FetchDataType<RequestResponse>,
    (_?: RequestInit) => Promise<FetchDataType<RequestResponse>>
] => {
    const [fetchState, setFetchState] = React.useState<FetchDataType<RequestResponse>>({
        status: FetchDataStatus.Initial,
    });

    const fetchData = React.useCallback(
        (requestInit?: RequestInit) => {
            setFetchState({ status: FetchDataStatus.Loading });

            return fetch(requestType, requestInit)
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
