import jwt from "jsonwebtoken";
import getSecret from "./utils/getSecret";

import { Container } from "../service.types";

const makeSecretProvider = () => {
  return (req: any, rawJwtToken: any, done: any) => {
    try {
      let secret = getSecret(req);

      done(null, secret);
    } catch (err) {
      done(err);
    }
  };
};

export default makeSecretProvider;
