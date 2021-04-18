import { RequestHandler } from "express";

const create: RequestHandler = async (req, res, next) => {
  try {
    const { OrganizationService } = res.locals.container.cradle;

    res.locals.response = await OrganizationService.create(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

export default create;
