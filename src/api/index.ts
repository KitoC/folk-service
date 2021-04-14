import { Router } from "express";
import auth from "./auth";

export default () => {
  const routes = Router();

  routes.use("/auth", auth);

  return routes;
};
