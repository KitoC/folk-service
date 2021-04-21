import jwt from "jsonwebtoken";
import getSecret from "./utils/getSecret";

import { Container } from "../service.types";

const makeGetToken = (args: Container) => {
  const { currentUser, userSettings } = args;

  return (req: any) => {
    const { appId } = req.params;
    const { JWT_ALGORITHM, JWT_EXPIRY, JWT_SECRET } = process.env;

    const jwtConfig: any = { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRY };

    const { email, firstName, lastName, id } = currentUser;
    const settings = userSettings;

    const secret = getSecret(appId);

    const jwtPayload: JwtPayload = {
      email,
      firstName,
      lastName,
      settings,
      id,
    };

    if (appId) {
      jwtPayload.appId = appId;
    }

    const token = jwt.sign(jwtPayload, secret, jwtConfig);

    return { token, jwtPayload };
  };
};

export default makeGetToken;