import { Router } from "express";
import v1 from "./v1";

export default () => {
  const routes = Router({ mergeParams: true });

  routes.use("/v1", v1);

  return routes;
};
