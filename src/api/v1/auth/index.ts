import { Router } from "express";
import middleware from "../../../middleware";
import utils from "../../../utils";

const router = Router({ mergeParams: true });

router.post(
  "/register",
  utils.middleware.tryCatchAll(
    middleware.users.validations.registration,
    middleware.authentication.register,
    middleware.authentication.signJwtForUser,
    middleware.shared.sendResponse
  )
);

router.post(
  "/login",
  utils.middleware.tryCatchAll(
    middleware.authentication.login,
    middleware.authentication.signJwtForUser,
    middleware.shared.sendResponse
  )
);

router.get(
  "/check-token",
  utils.middleware.tryCatchAll(
    middleware.authentication.requireJwt,
    middleware.authentication.checkToken,
    middleware.shared.sendResponse
  )
);

export default router;
