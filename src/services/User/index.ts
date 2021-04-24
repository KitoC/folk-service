import { Container } from "../service.types";
import makeGetUserAppSettings from "./getUserAppSettings";
import makeUpdateUserAppSettings from "./updateUserAppSettings";
import makeFindOne from "./findOne";

const makeUserService = (container: Container) => {
  return {
    findOne: makeFindOne(container),
    getUserAppSettings: makeGetUserAppSettings(container),
    updateUserAppSettings: makeUpdateUserAppSettings(container),
  };
};

export default makeUserService;
