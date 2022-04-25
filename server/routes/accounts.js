import express from "express";
import {
  controllerGetAccountBalance,
  controllerGetListNormalTrx,
} from "../controllers/account.controller.js";

const apiRouterProd = express.Router();

apiRouterProd.get("/account/:address", controllerGetAccountBalance);
apiRouterProd.get("/account/listtrx/:address", controllerGetListNormalTrx);

export default apiRouterProd;
