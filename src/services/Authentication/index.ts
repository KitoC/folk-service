import { Container } from "../service.types";
import makeJwtStrategy from "./jwtStrategy";
import makeGetToken from "./getToken";
import makeLogin from "./login";
import makeRegister from "./register";
import makeSecretProvider from "./secretProvider";
import getSecret from "./utils/getSecret";
import setCurrentUser from "./utils/setCurrentUser";

const makeAuthenticationService = (container: Container) => {
  const { db, currentUser } = container;

  const utils = {
    getSecret,
    setCurrentUser,
  };

  return {
    secretProvider: makeSecretProvider(),
    jwtStrategy: makeJwtStrategy(container),
    getToken: makeGetToken(container),
    login: makeLogin(container),
    register: makeRegister(container),
    utils,
  };
};

export default makeAuthenticationService;
