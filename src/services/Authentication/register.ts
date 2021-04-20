import bcrypt from "bcrypt";
import errors from "../../errors";
import setCurrentUser from "./utils/setCurrentUser";

import { Container } from "../service.types";

const makeRegister = (args: Container) => {
  const { db, UserService } = args;

  return async (req: any, res: any) => {
    const { appId } = req.params;
    const { password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));

    let user = await UserService.findOne({ where: { email } });

    if (!user) {
      const newUser = req.body;

      if (!appId) {
        newUser.password = hashedPassword;
      }

      await db.User.create(newUser);

      user = await UserService.findOne({ where: { email } });
    }

    if (appId) {
      await db.UserAppPassword.create({
        appId,
        userId: user.id,
        password: hashedPassword,
      });

      await db.UserAppSetting.create({
        appId,
        userId: user.id,
        settings: {},
      });
    }

    setCurrentUser(res, { user });
  };
};

export default makeRegister;
