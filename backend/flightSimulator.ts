import { FLIGHT_ROUTE, EARTH_R } from "./common/const";
import { CoordinateType, RoutePoint } from "./common/interfaces";

const STEP_LONG = 0.2;

export const simulateFlight = (route: CoordinateType[]) => {
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

export const getRouteDistance = (route: CoordinateType[]) => {
    let res = 0;

    route.reduce((a, b) => {
        res += getDistance(a, b);
        return b;
    });

    return res;
};
