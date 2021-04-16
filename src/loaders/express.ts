import express, { RequestHandler, ErrorRequestHandler } from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "../api";
import get from "lodash/get";
import { LoaderArgs } from "../@types/loader.types";

const send200Status: RequestHandler = (req, res) => {
  res.status(200).json({ status: "OK" });
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  console.log(err);
  res.json({ errors: { message: err.message } });
};

export default ({ app, config }: LoaderArgs) => {
  app.get("/status", send200Status);
  app.head("/status", send200Status);

  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet());

  app.use(express.json());

  app.use(get(config, "api.prefix", ""), routes());

  app.use(errorHandler);
};
