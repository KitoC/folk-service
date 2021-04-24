import { RequestHandler } from "express";

const createOne: RequestHandler = async (req, res, next) => {
  const { organizationId } = req.params;
  const { AppService } = res.locals.container.cradle;

  const payload = { ...req.body, organizationId };

  res.locals.response = await AppService.get(payload);

  next();
};

export default createOne;
