import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import errors from "../errors";
import { RequestHandler } from "express";
import { UserInstance } from "../db/models/user";
import utils from "../utils";
import * as awilix from "awilix";

const signJwtForUser: RequestHandler = (req, res, next) => {
  const UserService = res.locals.scope.resolve("UserService");

  const token = UserService.getToken();

  res.locals.response = { token };

  next();
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const { UserService } = res.locals.container.cradle;

    await UserService.register(req, res);

    next();
  } catch (error) {
    return next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { UserService } = res.locals.container.cradle;

    await UserService.login(req, res);

    next();
  } catch (error) {
    next(error);
  }
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
        return next(errors.authentication.AUTH_USER_NOT_FOUND);
      }

      if (user) {
        res.locals.currentUser = user;
        return next();
      }
    }
  )(req, res, next);
};

const authenticationMiddlewares = {
  register,
  initializePassport: passport.initialize(),
  signJwtForUser,
  login,
  requireJwt,
};

export default authenticationMiddlewares;
