import React from "react";
import { Polyline } from "react-leaflet";
import { RequestName } from "../common/requestName";
import { useFetchData } from "../service";
import { FlightRouteType } from "../common/interfaces";

type VectorLayersExampleProps = {
    flightId: string;
};
export function Route({ flightId }: VectorLayersExampleProps) {
    const [{ data: routeData }, fetchRouteState] = useFetchData<FlightRouteType>(
        RequestName.GET_FLIGHT_ROUTE
    );

    React.useEffect(() => {
        fetchRouteState(
            JSON.stringify({
                flightId,
            })
        );
    }, [fetchRouteState, flightId]);

    if (routeData)
        return (
            <Polyline
                pathOptions={{ color: "red" }}
                positions={routeData.coordinateList.map(({ coordinates }) => coordinates)}
            />
        );
    else return null;
}
