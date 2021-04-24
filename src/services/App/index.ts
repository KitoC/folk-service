import { Container } from "../service.types";
import makeCreateOne from "./createOne";
import makeUpdateOne from "./updateOne";
import makeGetOne from "./getOne";
import makeGetAll from "./getAll";

const makeAppService = (container: Container) => {
  return {
    createOne: makeCreateOne(container),
    updateOne: makeUpdateOne(container),
    getOne: makeGetOne(container),
    getAll: makeGetAll(container),
  };
};

export default makeAppService;
