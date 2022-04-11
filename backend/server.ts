import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { RequestName } from "./common/requestName";
import { AIRPORTS, FLIGHT_ROUTE, ROUTES_PLAN_TYPE } from "./common/const";
import { requestLogger } from "./logger";
import { SimulateFlight } from "./flightSimulator";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;

const connectToDB = () => new Promise<void>((res) => res());

connectToDB().then(() => {
    // ------
    let exempleFlightRoute = SimulateFlight(FLIGHT_ROUTE.coordinateList);
    let i = 0;

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
        console.log(i, exempleFlightRoute.length)
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
