import { Container } from "../service.types";
import makeCreateOne from "./createOne";

const makeOrganizationService = (container: Container) => {
  return {
    createOne: makeCreateOne(container),
  };
};

export default makeOrganizationService;
