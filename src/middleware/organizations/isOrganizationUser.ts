import { RequestHandler } from "express";

const isOrganizationUser: RequestHandler = async (req, res, next) => {
  const { OrganizationService } = res.locals.container.cradle;

  await OrganizationService.isOrganizationUser(req);

  next();
};

export default isOrganizationUser;
