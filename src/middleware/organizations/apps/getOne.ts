import { RequestHandler } from "express";

const getOne: RequestHandler = async (req, res, next) => {
  const { AppService } = res.locals.container.cradle;

  res.locals.response = await AppService.getOne(req);

  next();
};

export default getOne;
