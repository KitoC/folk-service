import { Container } from "../service.types";

const makeOrganizationService = (container: Container) => {
  return {
    createOne: makeCreateOne(container),
  };
};

export default makeOrganizationService;
