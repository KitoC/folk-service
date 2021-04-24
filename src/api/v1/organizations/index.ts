import { Router } from "express";
import middleware from "../../../middleware";
import utils from "../../../utils";
import apps from "./apps";

const router = Router({ mergeParams: true });

router.use("/:organizationId/apps", apps);

router.post(
  "/",
  utils.middleware.tryCatchAll(
    middleware.authentication.requireJwt,
    middleware.organizations.createOne,
    middleware.shared.sendResponse
  )
);

export default router;
