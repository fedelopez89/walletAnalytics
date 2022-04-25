import express from "express";
import apiRouterProd from "./accounts.js";

const appRoute = express();

appRoute.use("/", apiRouterProd);

export default appRoute;
