import { Router } from "express";
import middleware from "../../../middleware";
import apps from "./apps";

const router = Router({ mergeParams: true });

router.use("/:organizationId/apps", apps);

router.post(
  "/",
  middleware.authentication.requireJwt,
  middleware.organizations.create,
  middleware.shared.sendResponse
);

export default router;
