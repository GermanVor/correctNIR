import React from "react";
import { Polyline } from "react-leaflet";
import { RequestName } from "../common/requestName";
import { useFetchData } from "../service";
import { FlightRouteType } from "../common/interfaces";

export function VectorLayersExample() {
    const [route, fetchRouteState] = useFetchData<FlightRouteType>(RequestName.GET_FLIGHT_ROUTE);

    React.useEffect(() => {
        fetchRouteState();
    }, [fetchRouteState]);

    if (route.data)
        return (
            <Polyline
                pathOptions={{ color: "red" }}
                positions={route.data.route.map(({ coordinats }) => coordinats)}
            />
        );
    else return null;
}
