import { RequestHandler as Middleware } from "express";

export const requestLogger: Middleware = (req, res, next) => {
    console.log("\n", req.path);
    if (Object.keys(req.body).length) console.log(req.body);

    next();
};
