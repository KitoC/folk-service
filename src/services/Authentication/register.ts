import bcrypt from "bcrypt";
import errors from "../../errors";
import setCurrentUser from "./utils/setCurrentUser";

import { Container } from "../service.types";

const makeRegister = (args: Container) => {
  const { db, UserService } = args;

  return async (req: any, res: any) => {
    const { appId } = req.params;
    const { password, email } = req.body;

    let user;

    await db.transaction(async (transaction: any) => {
      const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));
      const getUser = () =>
        UserService.findOne({ where: { email }, transaction });

      user = await getUser();

      if (!user) {
        const newUser = req.body;

        if (!appId) {
          newUser.password = hashedPassword;
        }

        await db.User.create(newUser, { transaction });

        user = await getUser();
      }
      const ids = { appId, userId: user.id };

      if (appId) {
        await db.UserAppPassword.create(
          { ...ids, password: hashedPassword },
          { transaction }
        );

        await db.UserAppSetting.create(ids, { transaction });
      }
    });

    setCurrentUser(res, { user });
  };
};

export default makeRegister;
