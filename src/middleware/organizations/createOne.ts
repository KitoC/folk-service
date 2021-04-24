import { RequestHandler } from "express";

const createOne: RequestHandler = async (req, res, next) => {
  const { OrganizationService } = res.locals.container.cradle;

  res.locals.response = await OrganizationService.createOne(req.body);

  next();
};

export default createOne;
