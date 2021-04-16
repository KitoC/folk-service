import { Request, Response, NextFunction } from "express";
import errors from "../../errors";

const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(errors.authentication.AUTH_NO_P_OR_U);
    }
    const { db } = res.locals.container.cradle;

    console.log(db.user);
    const user = await db.User.findOne({ where: { email } });

    if (user) {
      next(errors.authentication.AUTH_USER_EXISTS);
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(errors.authentication.AUTH_NO_P_OR_U);
    }
    const { db } = res.locals.container.cradle;

    const user = await db.User.findOne({ where: { email } });

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
