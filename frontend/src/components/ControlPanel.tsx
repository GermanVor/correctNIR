import React from "react";
import { RequestName } from "../common/requestName";
import { RouteListItemType, RoutesPlanType } from "../common/interfaces";

import { useFetchData } from "../service";
import { useMap } from "react-leaflet";
import { Route } from "./Route";
import { FlightObserver } from "./FlightObserver";
import { formateDate } from "../common/functions";

const RouteItem = ({
    departure,
    destination,
    departureTime,
    destinationTime,
}: RouteListItemType) => (
    <div className="RouteItem">
        <div className="RouteItemLine">
            <span>{departure.name}</span>
            <span>{" -> "}</span>
            <span>{destination.name}</span>
        </div>
        <div className="RouteItemLine RouteItemTime">
            <span>{formateDate(departureTime)}</span>
            <span>{formateDate(destinationTime)}</span>
        </div>
    </div>
);

type RouteObserverProps = Pick<RoutesPlanType, "routeList">;
const RouteListObserver = ({ routeList }: RouteObserverProps) => (
    <React.Fragment>
        {routeList.map(({ flightId }, i) => (
            <Route flightId={flightId} />
        ))}
    </React.Fragment>
);

type FlightListObserverProps = Pick<RoutesPlanType, "routeList">;
const FlightListObserver = ({ routeList }: FlightListObserverProps) => (
    <React.Fragment>
        {routeList.map(({ flightId }, i) => (
            <FlightObserver flightId={flightId} key={`fo-${i}`} />
        ))}
    </React.Fragment>
);

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
                    {data?.routeList.map((route, i) => (
                        <RouteItem key={i} {...route} />
                    ))}
                </div>
            </div>
            {data && (
                <React.Fragment>
                    <RouteListObserver routeList={data.routeList} />
                    <FlightListObserver routeList={data.routeList} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
