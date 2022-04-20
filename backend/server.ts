import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { RequestName } from "./common/requestName";
import { AIRPORTS, FLIGHT_ROUTE, ROUTES_PLAN_TYPE, MIDDLE_PLANE_SPEED } from "./common/const";
import { requestLogger } from "./logger";
import { simulateFlight } from "./flightSimulator";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;

const connectToDB = () => new Promise<void>((res) => res());

connectToDB().then(() => {
    // ------

    let exempleFlightRoute = simulateFlight(
        FLIGHT_ROUTE.coordinateList.map(({ coordinates }) => coordinates)
    );
    let i = 0;

    ROUTES_PLAN_TYPE.routeList[0].departureTime = new Date().getTime();
    ROUTES_PLAN_TYPE.routeList[0].destinationTime =
        ROUTES_PLAN_TYPE.routeList[0].departureTime +
        (ROUTES_PLAN_TYPE.routeList[0].distance / MIDDLE_PLANE_SPEED) * 3600000;

    // ------

    const app = express();

    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
        })
    );
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(requestLogger);

    app.get(RequestName.GET_AIRPORTS, (_, res) => {
        res.send(AIRPORTS);
    });

    app.get(RequestName.GET_ROUTES_PLAN, (_, res) => {
        res.send(ROUTES_PLAN_TYPE);
    });

    app.post<{}, {}, { flightId: string }>(RequestName.GET_FLIGHT_ROUTE, (_, res) => {
        res.send(FLIGHT_ROUTE);
    });

    app.post<{}, {}, { flightId: string }>(RequestName.GET_FlIGHT_POSITION, (_, res) => {
        if (i === exempleFlightRoute.length) {
            i = 0;
        }

        res.send({
            coordinates: exempleFlightRoute[i],
            time: new Date().getTime(),
        });

        ++i;
    });

    app.get(RequestName.GET_HISTORY_OF_THE_FLIGHT_ROUTE, (_, res) => {
        res.send({});
    });

    console.log(`⚡️[server]: Try to start server`);
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});
