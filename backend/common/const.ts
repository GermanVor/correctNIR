import { AirportType, FlightRouteType, RoutesPlanType } from "./interfaces";

export const AIRPORTS: AirportType[] = [
    {
        name: "Vnukovo",
        icao: "UUWW",
        coordinates: [55.5957, 37.2659],
    },
    {
        name: "Pulkovo",
        icao: "ULLI",
        coordinates: [59.8003, 30.2625],
    },
];

export const FLIGHT_ROUTE: FlightRouteType = {
    meta: {
        departureIcao: "UUWW",
        destinationIcao: "ULLI",
    },
    coordinateList: [
        {
            id: "UUWW",
            coordinates: [55.5957, 37.2659],
        },
        {
            id: "AJ",
            coordinates: [56.5175, 34.9364],
        },
        {
            id: "LANSO",
            coordinates: [57.7494, 33.4769],
        },
        {
            id: "SIFON",
            coordinates: [58.0811, 33.0492],
        },
        {
            id: "OKUDI",
            coordinates: [59.1164, 31.6478],
        },
        {
            id: "ULLI",
            coordinates: [59.8003, 30.2625],
        },
    ],
};

export const ROUTES_PLAN_TYPE: RoutesPlanType = {
    routeList: [{ flightId: "qweqwe", departure: AIRPORTS[0], destination: AIRPORTS[1] }],
    size: 1,
};
