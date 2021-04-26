import { RequestHandler } from "express";

const updateOne: RequestHandler = async (req, res, next) => {
  const { AppService } = res.locals.container.cradle;

  res.locals.response = await AppService.updateOne(req, res);

  next();
};

export default updateOne;
