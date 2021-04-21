import { Router } from "express";
import middleware from "../../../middleware";
import utils from "../../../utils";

const router = Router({ mergeParams: true });

router.get(
  "/apps/:appId/settings",
  utils.middleware.tryCatchAll(
    middleware.authentication.requireJwt,
    middleware.users.apps.getSettings,
    middleware.shared.sendResponse
  )
);

router.patch(
  "/apps/:appId/settings",
  utils.middleware.tryCatchAll(
    middleware.authentication.requireJwt,
    middleware.users.apps.updateSettings,
    middleware.shared.sendResponse
  )
);

export default router;
