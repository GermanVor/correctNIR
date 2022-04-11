import { FLIGHT_ROUTE } from "./common/const";
import { CoordinateType, RoutePoint } from "./common/interfaces";

const STEP_LONG = 0.2;

export const SimulateFlight = (route: RoutePoint[]) => {
    const flightPlan: CoordinateType[] = [route[0].coordinates];

    route.reduce((a, b) => {
        const lat_1 = a.coordinates[0];
        const lon_1 = a.coordinates[1];

        const lat_2 = b.coordinates[0];
        const lon_2 = b.coordinates[1];

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

    flightPlan.push(route[route.length - 1].coordinates);

    return flightPlan;
};
