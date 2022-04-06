export type CoordinateType = [number, number];

export type AirportType = {
    icao: string;
    name: string;
    coordinats: CoordinateType;
};

export type RoutePoint = {
    id: string;
    coordinats: CoordinateType;
};

export type FlightRouteType = {
    meta: {
        departureIcao: string;
        destinationIcao: string;
    };
    route: RoutePoint[];
};

type RouteListItemType = {
    routeId: string;
    departure: AirportType;
    destination: AirportType;
};

export type RoutesPlanType = {
    routeList: RouteListItemType[];
    size: number;
};
