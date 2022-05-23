import {
    AIRPORTS,
    EARTH_R,
    FLIGHT_ROUTE,
    HOUR,
    MIDDLE_PLANE_SPEED,
    PLANE_INFO,
    ROUTES_PLAN_TYPE,
} from "./common/const";
import { CoordinateType, PlaneInfoType } from "./common/interfaces";

const STEP_LONG = 0.1;

const simulateFlight = (route: CoordinateType[]) => {
    const flightPlan: CoordinateType[] = [route[0]];

    route.reduce((a, b) => {
        const lat_1 = a[0];
        const lon_1 = a[1];

        const lat_2 = b[0];
        const lon_2 = b[1];

        const directionToIncLat = lat_1 < lat_2 ? 1 : -1;
        const directionToIncLon = lon_1 < lon_2 ? 1 : -1;

        const stepsCount = Math.floor(
            Math.sqrt(Math.pow(lat_1 - lat_2, 2) + Math.pow(lon_1 - lon_2, 2)) / STEP_LONG
        );

        const latStep = Math.abs(lat_1 - lat_2) / stepsCount;
        const lonStep = Math.abs(lon_1 - lon_2) / stepsCount;

        for (let i = 0; i !== stepsCount; ++i) {
            const prevLat = flightPlan[flightPlan.length - 1][0];
            const prevLon = flightPlan[flightPlan.length - 1][1];

            const currentLat = prevLat + directionToIncLat * latStep;
            const currentLon = prevLon + directionToIncLon * lonStep;

            flightPlan.push([currentLat, currentLon]);
        }

        return b;
    });

    flightPlan.push(route[route.length - 1]);

    return flightPlan;
};

export const getRouteDistance = (route: CoordinateType[]) => {
    let res = 0;

    route.reduce((a, b) => {
        res += getDistance(a, b);
        return b;
    });

    return res;
};

const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class SimulatorClass {
    _flightRoutes: Record<string, CoordinateType[]> = {};
    _flightRoutesIdx: Record<string, number> = {};

    _buildRoute = (flightId: string) => {
        this._flightRoutes[flightId] = simulateFlight(
            FLIGHT_ROUTE[flightId].coordinateList.map(({ coordinates }) => coordinates)
        );

        this._flightRoutesIdx[flightId] = 0;
    };

    _getIdx = (flightId: string) => {
        if (this._flightRoutes[flightId].length === this._flightRoutesIdx[flightId]) {
            this._flightRoutesIdx[flightId] = 0;
        }

        return this._flightRoutesIdx[flightId];
    };

    getRoutesPlan = () => {
        ROUTES_PLAN_TYPE.routeList.forEach(({ flightId }, i) => {
            ROUTES_PLAN_TYPE.routeList[i].distance = getRouteDistance(
                FLIGHT_ROUTE[flightId].coordinateList.map(({ coordinates }) => coordinates)
            );

            const nowTime = new Date().getTime();

            ROUTES_PLAN_TYPE.routeList[i].departureTime = getRandomInt(
                nowTime - HOUR,
                nowTime + HOUR
            );
            ROUTES_PLAN_TYPE.routeList[i].destinationTime =
                ROUTES_PLAN_TYPE.routeList[i].departureTime +
                (ROUTES_PLAN_TYPE.routeList[i].distance / MIDDLE_PLANE_SPEED) * HOUR;
        });

        return ROUTES_PLAN_TYPE;
    };

    getCoordinates = (flightId: string) => {
        if (this._flightRoutes[flightId] === undefined) {
            this._buildRoute(flightId);
        }

        const idx = this._getIdx(flightId);
        const allRoute = this._flightRoutes[flightId];

        const coordinates = allRoute[idx];

        ++this._flightRoutesIdx[flightId];

        return coordinates;
    };

    getPlaneInfo = (planeId: string): PlaneInfoType => {
        const speed = PLANE_INFO[planeId].groundSpeed;
        const calibratedAltitude = PLANE_INFO[planeId].calibratedAltitude;

        return {
            ...PLANE_INFO[planeId],
            groundSpeed: getRandomInt(speed - 5, speed + 5),
            calibratedAltitude: getRandomInt(calibratedAltitude - 3, calibratedAltitude + 3),
        };
    };

    getFlightRoute = (flightId: string) => {
        return FLIGHT_ROUTE[flightId];
    };

    getAirports = () => {
        return AIRPORTS;
    };
}

export const deg2rad = (deg: number) => deg * (Math.PI / 180);

export const getDistance = (startPoint: CoordinateType, endPoint: CoordinateType) => {
    const lat_1 = startPoint[0];
    const lon_1 = startPoint[1];

    const lat_2 = endPoint[0];
    const lon_2 = endPoint[1];

    const dLat = deg2rad(lat_2 - lat_1);
    const dLon = deg2rad(lon_2 - lon_1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat_1)) *
            Math.cos(deg2rad(lat_2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_R * c;
};
