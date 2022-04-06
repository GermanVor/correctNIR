import React from "react";
import { RequestName } from "../common/requestName";
import { RoutesPlanType } from "../common/interfaces";

import { useFetchData } from "../service";
import { useMap } from "react-leaflet";
// import { Route } from "./Route";

export const ControlPanel = () => {
    const [{ data }, fetchRoutesPlan] = useFetchData<RoutesPlanType>(RequestName.GET_ROUTES_PLAN);
    const map = useMap();

    React.useEffect(() => {
        fetchRoutesPlan();
    }, []);

    return (
        <React.Fragment>
            <div
                className="ControlPanel"
                onMouseDown={() => {
                    map.dragging.disable();
                }}
                onMouseUp={() => {
                    map.dragging.enable();
                }}
            >
                <div className="ControlPanelContent">
                    {data?.routeList.map(({ departure, destination }, i) => (
                        <span key={i}>{`${departure.name} -> ${destination.name}`}</span>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};
