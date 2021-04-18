import { Router } from "express";
import auth from "./auth";
import organizations from "./organizations";

export default () => {
  const routes = Router({ mergeParams: true });

  routes.use("/auth", auth);
  routes.use("/organizations", organizations);

  return routes;
};
