import { Container } from "../service.types";
import { AppAttributes } from "../../db/models/types";
import sequelize, { Sequelize } from "sequelize";

const makeGetOne = ({ db }: Container) => {
  return async (params: AppAttributes) => {
    const transaction = await db.sequelize.transaction();

    const { id } = await db.App.create(params, { transaction });

    const app = await db.App.findOne({
      where: { id },
      transaction,
      attributes: db.App.decryptedAttributes,
    });

    await transaction.commit();

    return app;
  };
};

export default makeGetOne;
