import { Router } from "express";
import middleware from "../../../../middleware";
import utils from "../../../../utils";

const router = Router({ mergeParams: true });

router.post(
  "/",
  utils.middleware.tryCatchAll(
    middleware.authentication.requireJwt,
    middleware.organizations.apps.create,
    middleware.shared.sendResponse
  )
);

router.patch(
  "/:appId",
  utils.middleware.tryCatchAll(
    middleware.authentication.requireJwt,
    middleware.organizations.apps.create,
    middleware.shared.sendResponse
  )
);

export default router;
