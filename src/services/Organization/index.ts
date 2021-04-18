import { OrganizationAttributes, Db } from "../../db/models/db.types";

const makeOrganizationService = ({ db }: { db: Db }) => {
  // Notice how we can use destructuring
  // to access dependencies
  return {
    create: (params: OrganizationAttributes) => {
      return db.Organization.create(params);
    },
  };
};

export default makeOrganizationService;
