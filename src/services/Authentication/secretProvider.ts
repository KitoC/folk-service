import jwt from "jsonwebtoken";
import getSecret from "./utils/getSecret";

import { Container } from "../service.types";

const makeSecretProvider = (container: Container) => {
  return (req: any, rawJwtToken: any, done: any) => {
    try {
      const { appId } = req.params;

      const secret = getSecret(appId);

      done(null, secret);
    } catch (err) {
      done(err);
    }
  };
};

export default makeSecretProvider;
