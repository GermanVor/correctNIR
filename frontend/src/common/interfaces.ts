export type CoordinateType = [number, number];

export type AirportType = {
    icao: string;
    name: string;
    coordinates: CoordinateType;
};

export type RoutePoint = {
    id: string;
    coordinates: CoordinateType;
};

export type FlightRouteType = {
    meta: {
        departureIcao: string;
        destinationIcao: string;
    };
    coordinateList: RoutePoint[];
};

export type RouteListItemType = {
    flightId: string;

    planeId: string;

    departure: AirportType;
    destination: AirportType;

    distance: number;
    departureTime: number;
    destinationTime: number;
};

export type RoutesPlanType = {
    routeList: RouteListItemType[];
    size: number;
    pageTocken?: string;
};

export type PlaneInfoType = {
    planeId: string;
    name: string;
    registration: string;

    groundSpeed: number;
    calibratedAltitude: number;
};
