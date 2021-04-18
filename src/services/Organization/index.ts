import {
  OrganizationAttributes,
  UserInstance,
  Db,
} from "../../db/models/db.types";

interface UserServiceArgs {
  db: Db;
  currentUser: UserInstance;
}

const makeOrganizationService = ({ db, currentUser }: UserServiceArgs) => {
  return {
    create: async (params: OrganizationAttributes) => {
      const organization = await db.Organization.create(params);
      const organizationId = organization.id;
      const userId = currentUser.id;

      await db.OrganizationUser.create({ organizationId, userId });

      return organization;
    },
  };
};

export default makeOrganizationService;
