import { AirportType, FlightRouteType, RoutesPlanType } from "./interfaces";

export const AIRPORTS: AirportType[] = [
    {
        name: "Vnukovo",
        icao: "UUWW",
        coordinats: [55.5957, 37.2659],
    },
    {
        name: "Pulkovo",
        icao: "ULLI",
        coordinats: [59.8003, 30.2625],
    },
];

export const FLIGHT_ROUTE: FlightRouteType = {
    meta: {
        departureIcao: "UUWW",
        destinationIcao: "ULLI",
    },
    route: [
        {
            id: "UUWW",
            coordinats: [55.5957, 37.2659],
        },
        {
            id: "AJ",
            coordinats: [56.5175, 34.9364],
        },
        {
            id: "LANSO",
            coordinats: [57.7494, 33.4769],
        },
        {
            id: "SIFON",
            coordinats: [58.0811, 33.0492],
        },
        {
            id: "OKUDI",
            coordinats: [59.1164, 31.6478],
        },
        {
            id: "ULLI",
            coordinats: [59.8003, 30.2625],
        },
    ],
};

export const ROUTES_PLAN_TYPE: RoutesPlanType = {
    routeList: [{ routeId: "qweqwe", departure: AIRPORTS[0], destination: AIRPORTS[1] }],
    size: 1,
};
