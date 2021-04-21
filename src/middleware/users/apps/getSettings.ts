import { RequestHandler } from "express";

const getSettings: RequestHandler = async (req, res, next) => {
  const { UserService } = res.locals.container.cradle;

  res.locals.response = await UserService.getUserAppSettings(req);

  next();
};

export default getSettings;
