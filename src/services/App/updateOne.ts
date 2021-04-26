import { Container } from "../service.types";

const makeUpdateOne = ({ db }: Container) => {
  return async (req: any, res: any) => {
    const { appId: id, organizationId } = req.params;

    const where = { id, organizationId };

    let app;

    await db.transaction(async (transaction: any) => {
      await db.App.update(req.body, { where: { id, organizationId } });

      app = await db.App.findOne({
        where,
        transaction,
        attributes: db.App.decryptedAttributes,
      });
    });

    return app;
  };
};

export default makeUpdateOne;
