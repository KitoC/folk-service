import { Container } from "../service.types";
import { WhereOptions } from "sequelize";

interface AppWhereParams {
  id?: string;
  organizationId?: string;
}

const makeGetOne = ({ db }: Container) => {
  return (req: any) => {
    const { appId: id, organizationId } = req.params;

    const where: WhereOptions = { id };

    if (organizationId) {
      where.organizationId = organizationId;
    }

    return db.App.findOne({
      where,
      attributes: db.App.decryptedAttributes,
    });
  };
};

export default makeGetOne;
