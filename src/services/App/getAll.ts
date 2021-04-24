import { Container } from "../service.types";

const makeGetAll = ({ db }: Container) => {
  return (req: any) => {
    const { organizationId } = req.params;

    return db.App.findAll({ where: { organizationId } });
  };
};

export default makeGetAll;
