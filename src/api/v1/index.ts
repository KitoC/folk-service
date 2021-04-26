import { Router } from "express";
import auth from "./auth";
import organizations from "./organizations";
import middleware from "../../middleware";
import utils from "../../utils";
import users from "./users";

const routes = Router({ mergeParams: true });

routes.use("/auth", auth);
routes.use(
  "/auth/:appId",
  utils.middleware.tryCatch(middleware.organizations.apps.checkSecretKey),
  auth
);
routes.use("/organizations", organizations);
routes.use("/my-account", users);

export default routes;
