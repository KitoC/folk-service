import { Router } from "express";
import auth from "./auth";

export default () => {
  const routes = Router();

  // const loadRoutes = (dirName) => {};

  routes.use("/auth", auth);

  return routes;
};
