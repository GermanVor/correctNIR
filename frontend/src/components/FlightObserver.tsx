import React from "react";
import { CircleMarker } from "react-leaflet";
import { CoordinateType, PlaneInfoType } from "../common/interfaces";
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
            fetchLastFlightPosition({
                flightId,
            }).then(({ status }) => {
                if (FetchDataStatus.Error === status) {
                    if (errorFetchCount === ERROR_FETCH_COUNT_LIMIT) refresher.stop();
                    else ++errorFetchCount;
                }
            });
        };

        refresher.start();
    }, [flightId]);

    if (!flightPosition) return null;
    return (
        <React.Fragment>
            <CircleMarker radius={5} center={flightPosition.coordinates} />
        </React.Fragment>
    );
};
