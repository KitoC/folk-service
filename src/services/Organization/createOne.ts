import { Container } from "../service.types";
import errors from "../../errors";

import { OrganizationAttributes } from "../../db/models/db.types";

const makeFindOne = (container: Container) => {
  const { db } = container;

  return async (params: OrganizationAttributes) => {
    const organization = await db.Organization.create(params);
    const organizationId = organization.id;
    const userId = currentUser.id;

    await db.OrganizationUser.create({ organizationId, userId });

    return organization;
  };
};

export default makeFindOne;
