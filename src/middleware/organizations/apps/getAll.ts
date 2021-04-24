import { RequestHandler } from "express";

const getAll: RequestHandler = async (req, res, next) => {
  const { AppService } = res.locals.container.cradle;

  res.locals.response = await AppService.getAll(req);

  next();
};

export default getAll;
