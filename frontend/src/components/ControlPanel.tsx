import React from "react";
import { RequestName } from "../common/requestName";
import { DomEvent } from "leaflet";
import { PlaneInfoType, RouteListItemType, RoutesPlanType } from "../common/interfaces";

import { useFetchData, useRefresher } from "../service";
import { Route } from "./Route";
import { FlightObserver } from "./FlightObserver";
import { formateDate } from "../common/functions";

type PlaneCardProps = {
    planeId: string;
};
const PlaneInfo = ({ planeId }: PlaneCardProps) => {
    const [{ data: planeData }, fetchLastFlightPosition] = useFetchData<PlaneInfoType>(
        RequestName.GET_PLANE_INFO,
        true
    );

    const refresher = useRefresher();

    React.useEffect(() => {
        refresher.callback = () => {
            fetchLastFlightPosition({ planeId });
        };

        refresher.start();
    }, []);

    if (!planeData) return null;
    return (
        <div className="PlaneCard">
            <span>{`AIRCRAFT TYPE: ${planeData.name}`}</span>
            <span>{`REGISTRATION: ${planeData.registration}`}</span>
            <span>{`GROUND SPEED: ${planeData.groundSpeed} km/h`}</span>
            <span>{`CALIBRATED ALTITUDE: ${planeData.calibratedAltitude} m`}</span>
        </div>
    );
};

type RouteItemProps = RouteListItemType & {};
const RouteItem = ({
    departure,
    destination,
    departureTime,
    destinationTime,
    flightId,
    planeId,
}: RouteItemProps) => {
    const [isActiveRoute, setActiveRoute] = React.useState(false);

    const toggleRouteItem = React.useCallback(() => {
        setActiveRoute((prevActiveState) => !prevActiveState);
    }, []);

    const currentClassName = "RouteItem " + (isActiveRoute ? "RouteItem_active" : "");

    return (
        <React.Fragment>
            <div className={currentClassName} onClick={toggleRouteItem}>
                <div className="RouteItemLine">
                    <span className="RouteItemLine__Name" title={departure.name}>
                        {departure.name}
                    </span>
                    <span className="RouteItemLine__Separator">{"->"}</span>
                    <span className="RouteItemLine__Name" title={destination.name}>
                        {destination.name}
                    </span>
                </div>
                <div className="RouteItemLine RouteItemTime">
                    <span>{formateDate(departureTime)}</span>
                    <span>{formateDate(destinationTime)}</span>
                </div>
                {isActiveRoute && <PlaneInfo planeId={planeId} />}
            </div>
            {isActiveRoute && (
                <React.Fragment>
                    <Route flightId={flightId} />
                    <FlightObserver flightId={flightId} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export const ControlPanel = () => {
    const [{ data }, fetchRoutesPlan] = useFetchData<RoutesPlanType>(RequestName.GET_ROUTES_PLAN);

    React.useEffect(() => {
        fetchRoutesPlan();
    }, []);

    return (
        <React.Fragment>
            <div
                className="ControlPanel"
                ref={(ref) => {
                    if (ref) DomEvent.disableClickPropagation(ref);
                }}
            >
                <div className="ControlPanelContent">
                    {data?.routeList.map((route, i) => (
                        <RouteItem key={i} {...route} />
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};
