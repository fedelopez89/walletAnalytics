"use strict";

import express from "express";
import cors from "cors";

// Webpack
import webpack from "webpack";
import webpackDev from "webpack-dev-middleware";
import { config } from "./webpack.config.babel.js";
import appRoute from "./server/routes/index.js";

// Initializing packages
const app = express();

// Static files
app.use(express.static("./public"));

// Cors setting
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove express header
app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  next();
});

// Settings
app.set("port", process.env.PORT || 3000);

// Middlwares
app.use(webpackDev(webpack(config)));

// Routes
app.use("/api/v1", appRoute);

console.log("Starting Server...");

// starting the server
app
  .listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  })
  .on("error", (error) => {
    console.log(error.message);
    console.log(
      `Listen method failed. Unable to listen on port ${app.get("port")}`
    );
  });
