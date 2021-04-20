import errors from "../../errors";

import { Container } from "../service.types";

interface JwtPayload {
  id: number;
  appId: number;
  organizationId: number;
}

const makeJwtStrategy = (args: Container) => {
  const { db } = args;

  return async (req: any, jwtPayload: JwtPayload, next: any) => {
    try {
      const user = await db.User.findOne({ where: { id: jwtPayload.id } });

      next(null, user);
    } catch (err) {
      next(err);
    }
  };
};

export default makeJwtStrategy;
