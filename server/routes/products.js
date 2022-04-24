import express from "express";
import {
  controllerGetProducts,
} from "../controllers/product.controller.js";

const apiRouterProd = express.Router();

apiRouterProd.get("/products", controllerGetProducts);

export default apiRouterProd;
