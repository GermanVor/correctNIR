import React from "react";
import { Polyline } from "react-leaflet";
import { RequestName } from "../common/requestName";
import { useFetchData } from "../service";
import { FlightRouteType } from "../common/interfaces";

type VectorLayersExampleProps = {
    routeId: string;
};
export function Route({ routeId }: VectorLayersExampleProps) {
    const [route, fetchRouteState] = useFetchData<FlightRouteType>(RequestName.GET_FLIGHT_ROUTE);

    React.useEffect(() => {
        fetchRouteState({
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                routeId,
            }),
        });
    }, [fetchRouteState, routeId]);

    if (route.data)
        return (
            <Polyline
                pathOptions={{ color: "red" }}
                positions={route.data.route.map(({ coordinats }) => coordinats)}
            />
        );
    else return null;
}
