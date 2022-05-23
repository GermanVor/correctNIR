import React from "react";
import { RequestName } from "../common/requestName";
import { DomEvent } from "leaflet";
import {
    CoordinateType,
    PlaneInfoType,
    RouteListItemType,
    RoutesPlanType,
} from "../common/interfaces";

import { useFetchData, useRefresher } from "../service";
import { Route } from "./Route";
import { FlightObserver } from "./FlightObserver";
import { formateDate } from "../common/functions";
import { Button } from "./Button";
import { useMap } from "react-leaflet";

type PlaneCardProps = {
    planeId: string;
    lastCoordantes?: CoordinateType;
    lastCoordantesTime?: number;
};
const PlaneInfo = ({ planeId, lastCoordantes, lastCoordantesTime }: PlaneCardProps) => {
    const map = useMap();

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

    const LastCoord = () => (
        <>
            {lastCoordantes ? (
                <span className="PlaneCard__Coord">{`(${lastCoordantes[0].toFixed(
                    2
                )}/${lastCoordantes[1].toFixed(2)})`}</span>
            ) : (
                "wait please"
            )}
        </>
    );

    if (!planeData) return null;
    return (
        <div className="PlaneCard">
            <span>{`AIRCRAFT TYPE: ${planeData.name}`}</span>
            <span>{`REGISTRATION: ${planeData.registration}`}</span>
            <span>{`GROUND SPEED: ${planeData.groundSpeed} km/h`}</span>
            <span>{`CALIBRATED ALTITUDE: ${planeData.calibratedAltitude} m`}</span>
            <span className="PlaneCard__CoordWrapper">
                {`LAST COORDINATES (lat/lon):`}
                <LastCoord />
                <Button
                    onClick={() => {
                        if (lastCoordantes) map.flyTo(lastCoordantes);
                    }}
                    className="PlaneCard__CoordGo"
                >
                    {"Focuse"}
                </Button>
            </span>
            {lastCoordantesTime && <span>{`TIME: ${formateDate(lastCoordantesTime)}`}</span>}
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

    const [lastCoordinatesState, setLastCoordinates] = React.useState<{
        coordinates: CoordinateType;
        lastCoordantesTime: number;
    }>();

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
                {isActiveRoute && (
                    <PlaneInfo
                        planeId={planeId}
                        lastCoordantes={lastCoordinatesState?.coordinates}
                        lastCoordantesTime={lastCoordinatesState?.lastCoordantesTime}
                    />
                )}
            </div>
            {isActiveRoute && (
                <React.Fragment>
                    <Route flightId={flightId} />
                    <FlightObserver flightId={flightId} setLastCoordinates={setLastCoordinates} />
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
