import { Router } from "express";
import middleware from "../../middleware";

const router = Router();

router.post(
  "/register",
  middleware.users.validations.registration,
  middleware.authentication.register,
  middleware.authentication.signJwtForUser,
  middleware.shared.sendResponse

  //   defaultResponse
);

router.post(
  "/login",
  middleware.users.validations.login,
  middleware.authentication.login,
  middleware.authentication.signJwtForUser,
  middleware.shared.sendResponse
);

router.get(
  "/check-token",
  // middleware.authentication.requireJwt,
  (req, res, next) => {
    res.locals.response = {
      authenticated: true,
      users: res.locals.container.cradle.db.User.findAll(),
    };
    next();
  },
  middleware.shared.sendResponse
);

export default router;
