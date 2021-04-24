import { Container } from "../service.types";

const makeGetOne = ({ db }: Container) => {
  return (req: any) => {
    const { appId: id, organizationId } = req.params;

    return db.App.findOne({ where: { id, organizationId } });
  };
};

export default makeGetOne;
