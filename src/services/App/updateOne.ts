import { Container } from "../service.types";

const makeUpdateOne = ({ db }: Container) => {
  return (req: any) => {
    const { appId: id, organizationId } = req.params;

    return db.App.update({ where: { id, organizationId } }, req.body);
  };
};

export default makeUpdateOne;
