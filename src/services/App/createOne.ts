import { Container } from "../service.types";
import { AppAttributes } from "../../db/models/db.types";

const makeGetOne = ({ db }: Container) => {
  return (params: AppAttributes) => {
    return db.App.create(params);
  };
};

export default makeGetOne;
