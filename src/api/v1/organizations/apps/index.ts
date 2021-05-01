import { Router } from "express";
import middleware from "../../../../middleware";
import utils from "../../../../utils";

const router = Router({ mergeParams: true });

router.get(
  "/:appId",
  utils.middleware.tryCatchAll(
    middleware.organizations.apps.getOne,
    middleware.shared.sendResponse
  )
);

router.get(
  "/",
  utils.middleware.tryCatchAll(
    middleware.organizations.apps.getAll,
    middleware.shared.sendResponse
  )
);

router.post(
  "/",
  utils.middleware.tryCatchAll(
    middleware.organizations.apps.createOne,
    middleware.shared.sendResponse
  )
);

router.patch(
  "/:appId",
  utils.middleware.tryCatchAll(
    middleware.organizations.apps.updateOne,
    middleware.shared.sendResponse
  )
);

export default router;
