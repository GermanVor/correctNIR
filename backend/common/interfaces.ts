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

type RouteListItemType = {
    flightId: string;

    departure: AirportType;
    destination: AirportType;

    distance: number;
    departureTime: number;
    destinationTime: number;
};

export type RoutesPlanType = {
    routeList: RouteListItemType[];
    size: number;
};
