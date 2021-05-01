import { Container } from "../service.types";
import errors from "../../errors";

import { OrganizationAttributes } from "../../db/models/db.types";

const makeFindOne = (container: Container) => {
  const { db, currentUser } = container;

  return async (req: any) => {
    console.log({ currentUser });
    const { organizationId } = req.params;
    const userId = currentUser.id;

    const orgUser = await db.OrganizationUser.findOne({
      where: {
        organizationId,
        userId,
      },
    });

    if (!orgUser) {
      throw errors.organizations.ORGANIZATION_USER_NO_ACCESS;
    }
  };
};

export default makeFindOne;
