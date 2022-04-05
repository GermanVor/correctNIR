import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { RequestName } from "./common/requestName";
import { AIRPORTS, FLIGHT_ROUTE } from "./common/const";
import { requestLogger } from "./logger";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;

const connectToDB = () => new Promise<void>((res) => res());

connectToDB().then(() => {
    const app = express();

    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3000",
            changeOrigin: true,
        })
    );

    app.use(requestLogger);

    app.get(RequestName.GET_AIRPORTS, (_, res) => {
        res.send(AIRPORTS);
    });

    app.get(RequestName.GET_FLIGHT_ROUTE, (_, res) => {
        res.send(FLIGHT_ROUTE);
    });

    console.log(`⚡️[server]: Try to start server`);
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});
