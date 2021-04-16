import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import errors from "../errors";
import { RequestHandler } from "express";
import { UserInstance } from "../db/models/user";

const signJwtForUser: RequestHandler = (req, res, next) => {
  console.log("process.env.JWT_ALGORITHIM", process.env.JWT_ALGORITHM);
  const jwtConfig = {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRY,
  } as any;

  const token = jwt.sign(
    {
      email: res.locals.currentUser.email,
      firstName: res.locals.currentUser.first_name,
      lastName: res.locals.currentUser.last_name,
      id: res.locals.currentUser.id,
    },
    process.env.JWT_SECRET,
    jwtConfig
  );

  res.locals.response = { token };

  next();
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      bcrypt.genSaltSync(8)
    );

    const newUser = await res.locals.container.cradle.db.User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.locals.currentUser = newUser;

    next();
  } catch (error) {
    return next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await res.locals.container.cradle.db.User.findOne({
      where: { email },
    });

    console.log("password, user.password", password, user.password);

    const passwordMatchs = await bcrypt.compare(password, user.password);

    if (passwordMatchs) {
      res.locals.currentUser = user;

      next();
    }

    if (!passwordMatchs) {
      return next(errors.authentication.AUTH_USER_WRONG_PW);
    }
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
