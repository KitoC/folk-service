import { RequestHandler } from "express";

const create: RequestHandler = async (req, res, next) => {
  try {
    const { organizationId } = req.params;
    const { AppService } = res.locals.container.cradle;

    const payload = { ...req.body, organizationId };

    res.locals.response = await AppService.create(payload);

    next();
  } catch (err) {
    next(err);
  }
};

export default create;
