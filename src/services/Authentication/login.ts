import bcrypt from "bcrypt";
import get from "lodash/get";
import errors from "../../errors";
import setCurrentUser from "./utils/setCurrentUser";

import { Container } from "../service.types";

const makeLogin = (args: Container) => {
  const { db, UserService } = args;

  return async (req: any, res: any) => {
    const { appId } = req.params;
    const { email, password } = req.body;

    if (!email || !password) {
      throw errors.authentication.AUTH_NO_P_OR_U;
    }

    const user = await UserService.findOne({ where: { email } });

    if (!user) {
      throw errors.authentication.AUTH_USER_NOT_FOUND;
    }

    let storedPassword = user.password;

    if (appId) {
      const AppPassword = await db.UserAppPassword.findOne({
        where: { appId, userId: user.id },
      });

      if (!AppPassword) {
        throw errors.authentication.AUTH_USER_NOT_FOUND;
      }

      storedPassword = get(AppPassword, "password");
    }

    const passwordMatchs = await bcrypt.compare(password, storedPassword);

    if (!passwordMatchs) {
      throw errors.authentication.AUTH_USER_WRONG_PW;
    }

    setCurrentUser(res, { user });
  };
};

export default makeLogin;
