import { Request, Response, NextFunction } from "express";
import errors from "../../errors";

const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { appId, organizationId } = req.params;
  const { email, password } = req.body;

  if (!email || !password) {
    throw errors.authentication.AUTH_NO_P_OR_U;
  }

  const { UserService, db } = res.locals.container.cradle;

  const include = [];

  if (appId) {
    include.push({ model: db.UserAppPassword, where: { appId } });
  }

  const user = await UserService.findOne({ where: { email }, include });

  if (user) {
    throw errors.authentication.AUTH_USER_EXISTS;
  }

  next();
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { appId } = req.params;
    const { email, password } = req.body;

    if (!email || !password) {
      next(errors.authentication.AUTH_NO_P_OR_U);
    }

    const { UserService, db } = res.locals.container.cradle;

    const include = [];

    if (appId) {
      include.push({ model: db.UserAppPassword, where: { appId } });
    }

    const user = await UserService.findOne({ where: { email }, include });

    if (!user) {
      next(errors.authentication.AUTH_USER_NOT_FOUND);
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validations = { registration, login };

export default validations;
