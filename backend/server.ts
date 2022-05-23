import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { RequestName } from "./common/requestName";
import { requestLogger } from "./logger";
import { SimulatorClass } from "./flightSimulator";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;

const connectToDB = () => new Promise<void>((res) => res());

connectToDB().then(() => {
    const simulator = new SimulatorClass();

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
        res.send(simulator.getAirports());
    });

    app.get(RequestName.GET_ROUTES_PLAN, (_, res) => {
        res.send(simulator.getRoutesPlan());
    });

    app.post<{}, {}, { flightId: string }>(
        RequestName.GET_FLIGHT_ROUTE,
        ({ body: { flightId } }, res) => {
            res.send(simulator.getFlightRoute(flightId));
        }
    );

    app.post<{}, {}, { flightId: string }>(
        RequestName.GET_FlIGHT_POSITION,
        ({ body: { flightId } }, res) => {
            res.send({
                coordinates: simulator.getCoordinates(flightId),
                time: new Date().getTime(),
            });
        }
    );

    app.post<{}, {}, { planeId: string }>(
        RequestName.GET_PLANE_INFO,
        ({ body: { planeId } }, res) => {
            res.send(simulator.getPlaneInfo(planeId));
        }
    );

    app.get(RequestName.GET_HISTORY_OF_THE_FLIGHT_ROUTE, (_, res) => {
        res.send({});
    });

    console.log(`⚡️[server]: Try to start server`);
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});
