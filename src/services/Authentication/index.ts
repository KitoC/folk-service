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

  return {
    secretProvider: makeSecretProvider(container),
    jwtStrategy: makeJwtStrategy(container),
    getToken: makeGetToken(container),
    login: makeLogin(container),
    register: makeRegister(container),
    utils: {
      getSecret,
      setCurrentUser,
    },
  };
};

export default makeAuthenticationService;
