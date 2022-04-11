import React from "react";
import { CircleMarker } from "react-leaflet";
import { CoordinateType } from "../common/interfaces";
import { RequestName } from "../common/requestName";
import { FetchDataStatus, useFetchData, useRefresher } from "../service";

const ERROR_FETCH_COUNT_LIMIT = 3;

type FlightObserverProps = {
    flightId: string;
};
export const FlightObserver = ({ flightId }: FlightObserverProps) => {
    const [{ data: flightPosition }, fetchLastFlightPosition] = useFetchData<{
        coordinates: CoordinateType;
        time: number;
    }>(RequestName.GET_FlIGHT_POSITION);

    const refresher = useRefresher();

    React.useEffect(() => {
        let errorFetchCount = 0;

        refresher.callback = () => {
            fetchLastFlightPosition(
                JSON.stringify({
                    flightId,
                })
            ).then(({ status }) => {
                if (FetchDataStatus.Error === status) {
                    if (errorFetchCount === ERROR_FETCH_COUNT_LIMIT) refresher.stop();
                    else ++errorFetchCount;
                }
            });
        };

        refresher.start();

        return refresher.stop;
    }, [flightId]);

    if (flightPosition) return <CircleMarker center={flightPosition.coordinates} />;
    return null;
};
