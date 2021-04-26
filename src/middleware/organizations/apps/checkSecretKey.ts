import { RequestHandler } from "express";
import errors from "../../../errors";

const checkSecretKey: RequestHandler = async (req, res, next) => {
  const { AppService } = res.locals.container.cradle;

  const app = await AppService.getOne(req);

  if (app.secretKey && app.secretKey !== req.headers.secretkey) {
    throw errors.authentication.AUTH_NO_SECRET_KEY;
  }

  next();
};

export default checkSecretKey;
