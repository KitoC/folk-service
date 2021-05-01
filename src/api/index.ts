import { Router } from "express";
import v1 from "./v1";
import utils from "../utils";

export default () => {
  const routes = Router({ mergeParams: true });

  routes.use(
    "/api/v1",
    utils.middleware.tryCatch((req: any, res: any, next: any) => {
      console.log();
      if (
        !req.headers.internalkey ||
        req.headers.internalkey !== process.env.INTERNAL_KEY
      ) {
        throw { message: "No Internal Key" };
      }

      next();
    }),
    v1
  );

  return routes;
};
