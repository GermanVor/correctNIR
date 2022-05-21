import { AirportType, FlightRouteType, PlaneInfoType, RoutesPlanType } from "./interfaces";

export const EARTH_R = 6371;

export const HOUR = 3600000;

export const MIDDLE_PLANE_SPEED = 700;

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
    {
        name: "Pskov",
        icao: "ULOO",
        coordinates: [57.7819, 28.3942],
    },
    {
        name: "Petrozavodsk",
        icao: "ULPB",
        coordinates: [61.8853, 34.1547],
    },
    {
        name: "Sheremetyevo",
        icao: "UUEE",
        coordinates: [55.9727, 37.4147],
    },
];

export const FLIGHT_ROUTE: Record<string, FlightRouteType> = {
    ["flightId_1"]: {
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
    },
    ["flightId_2"]: {
        meta: {
            departureIcao: "ULOO",
            destinationIcao: "ULPB",
        },
        coordinateList: [
            {
                id: "ULOO",
                coordinates: [57.7819, 28.3942],
            },
            {
                id: "BAMAD",
                coordinates: [59.4497, 29.6308],
            },
            {
                id: "SPB",
                coordinates: [59.8069, 30.2746],
            },
            {
                id: "AGBON",
                coordinates: [60.0331, 31.5475],
            },
            {
                id: "TURSU",
                coordinates: [60.1353, 31.6194],
            },
            {
                id: "NUKSA",
                coordinates: [60.5839, 31.9408],
            },
            {
                id: "ULPB",
                coordinates: [61.8853, 34.1547],
            },
        ],
    },
    ["flightId_3"]: {
        meta: {
            departureIcao: "ULOO",
            destinationIcao: "UUEE",
        },
        coordinateList: [
            {
                id: "ULOO",
                coordinates: [57.7819, 28.3942],
            },
            {
                id: "KUDIM",
                coordinates: [56.7181, 30.7194],
            },
            {
                id: "ROMEL",
                coordinates: [56.5531, 31.0761],
            },
            {
                id: "OLMET",
                coordinates: [56.1781, 32.1178],
            },
            {
                id: "TU",
                coordinates: [55.8542, 32.9392],
            },
            {
                id: "BAKNA",
                coordinates: [55.625, 34.5597],
            },
            {
                id: "UUEE",
                coordinates: [55.9725, 37.4131],
            },
        ],
    },
};

export const PLANE_INFO: Record<string, PlaneInfoType> = {
    ["planeId_1"]: {
        name: "Airbus A319-111",
        planeId: "planeId_1",
        registration: "F-GRHY",
        groundSpeed: 642,
        calibratedAltitude: 6304
    },
    ["planeId_2"]: {
        name: "Boeing 777-39P(ER)",
        planeId: "planeId_2",
        registration: "B-2003",
        groundSpeed: 723,
        calibratedAltitude: 7211
    },
    ["planeId_3"]: {
        name: "Airbus A320-214",
        planeId: "planeId_3",
        registration: "RA-73766",
        groundSpeed: 759,
        calibratedAltitude: 10211
    }
}

export const ROUTES_PLAN_TYPE: RoutesPlanType = {
    routeList: [
        {
            flightId: "flightId_1",
            planeId: "planeId_1",
            departure: AIRPORTS[0],
            destination: AIRPORTS[1],
            distance: 0,
            departureTime: 0,
            destinationTime: 1,
        },
        {
            flightId: "flightId_2",
            planeId: "planeId_2",
            departure: AIRPORTS[2],
            destination: AIRPORTS[3],
            distance: 0,
            departureTime: 0,
            destinationTime: 1,
        },
        {
            flightId: "flightId_3",
            planeId: "planeId_3",
            departure: AIRPORTS[2],
            destination: AIRPORTS[4],
            distance: 0,
            departureTime: 0,
            destinationTime: 1,
        },
    ],
    size: 4,
};
