import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import errors from "../errors";
import { RequestHandler } from "express";
import { UserInstance } from "../db/models/user";
import utils from "../utils";
import * as awilix from "awilix";

const signJwtForUser: RequestHandler = (req, res, next) => {
  const { AuthenticationService } = res.locals.container.cradle;

  const { token } = AuthenticationService.getToken(req);

  res.locals.response = { token };

  next();
};

const register: RequestHandler = async (req, res, next) => {
  const { AuthenticationService } = res.locals.container.cradle;

  await AuthenticationService.register(req, res);

  next();
};

const login: RequestHandler = async (req, res, next) => {
  const { AuthenticationService } = res.locals.container.cradle;

  await AuthenticationService.login(req, res);

  next();
};

const jwtErrorSwitch = (message: string) => {
  switch (message) {
    case "No auth token":
      return errors.authentication.AUTH_NO_TOKEN;

    case "invalid token":
      return errors.authentication.AUTH_INVALID_TOKEN;

    default:
      return { message, status: 401, code: "N/A" };
  }
};

const requireJwt: RequestHandler = (req, res, next) => {
  const { AuthenticationService } = res.locals.container.cradle;

  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: UserInstance, failuresOrInfo: Error) => {
      if (failuresOrInfo) {
        const message = failuresOrInfo.message;
        const error = jwtErrorSwitch(message);

        return next(error);
      }

      if (!user) {
        res.locals.currentUser = null;

        return next(err || errors.authentication.AUTH_USER_NOT_FOUND);
      }

      if (user) {
        AuthenticationService.utils.setCurrentUser(res, { user });

        return next();
      }
    }
  )(req, res, next);
};

const checkToken: RequestHandler = (req, res, next) => {
  res.locals.response = {
    authenticated: true,
  };

  next();
};

const authenticationMiddlewares = {
  register,
  initializePassport: passport.initialize(),
  signJwtForUser,
  login,
  requireJwt,
  checkToken,
};

export default authenticationMiddlewares;
