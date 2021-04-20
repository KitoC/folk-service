import { Router } from "express";
import middleware from "../../../middleware";
import auth from "../../auth";

const router = Router({ mergeParams: true });

// router.use("/:appId/auth", auth);

router.post(
  "/",
  middleware.authentication.requireJwt,
  middleware.organizations.apps.create,
  middleware.shared.sendResponse
);

router.patch(
  "/:appId",
  middleware.authentication.requireJwt,
  (req, res, next) => {
    res.locals.response = {
      authenticated: true,
      users: res.locals.container.cradle.db.User.findAll(),
    };
    next();
  },
  // middleware.organizations.apps.create,
  middleware.shared.sendResponse
);

// router.post(
//   "/:appId/register",
//   middleware.users.validations.registration,
//   middleware.authentication.register,
//   middleware.authentication.signJwtForUser,
//   middleware.shared.sendResponse
// );

// router.post(
//   "/login",
//   middleware.users.validations.login,
//   middleware.authentication.login,
//   middleware.authentication.signJwtForUser,
//   middleware.shared.sendResponse
// );

// router.get(
//   "/:appId/check-token",
//   middleware.authentication.requireJwt,

//   // middleware.authentication.requireJwt,
// (req, res, next) => {
//   res.locals.response = {
//     authenticated: true,
//     users: res.locals.container.cradle.db.User.findAll(),
//   };
//   next();
// },
//   middleware.shared.sendResponse
// );

export default router;
