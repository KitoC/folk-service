import { Container } from "../service.types";
import makeCreateOne from "./createOne";
import makeIsOrganizationUser from "./isOrganizationUser";

const makeOrganizationService = (container: Container) => {
  return {
    createOne: makeCreateOne(container),
    isOrganizationUser: makeIsOrganizationUser(container),
  };
};

export default makeOrganizationService;
