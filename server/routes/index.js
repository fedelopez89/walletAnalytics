import express from "express";
import apiRouterProd from "./products.js";

const appRoute = express();

appRoute.use("/", apiRouterProd);

export default appRoute;
