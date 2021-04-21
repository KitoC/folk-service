import { Router } from "express";
import middleware from "../../middleware";
import apps from "./apps";

const router = Router({ mergeParams: true });

router.use("/:organizationId/apps", apps);

// router.post(
//   "/register",
//   middleware.users.validations.registration,
//   middleware.authentication.register,
//   middleware.authentication.signJwtForUser,
//   middleware.shared.sendResponse

//   //   defaultResponse
// );

router.post(
  "/",
  middleware.authentication.requireJwt,
  middleware.organizations.create,
  middleware.shared.sendResponse
);

// router.get(
//   "/check-token",
//   // middleware.authentication.requireJwt,
//   (req, res, next) => {
//     res.locals.response = {
//       authenticated: true,
//       users: res.locals.container.cradle.db.User.findAll(),
//     };
//     next();
//   },
//   middleware.shared.sendResponse
// );

export default router;
