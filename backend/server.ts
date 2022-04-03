import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";
import { RequestName } from "common/requestName";
import { AIRPORTS } from "common/const";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;

const connectToDB = () => new Promise<void>((res) => res());

connectToDB().then((dbClient) => {
    const app = express();

    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );

    app.get("/qwerty", (_req, res) => {
        console.log("biba");

        setTimeout(() => {
            res.send({ biba: 213 });
        }, 1500);
    });

    app.get(RequestName.GET_AIRPORTS, (_req, res) => {
        res.send(AIRPORTS);
    });

    console.log(`⚡️[server]: Try to start server`);

    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});
