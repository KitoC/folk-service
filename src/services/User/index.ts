import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import get from "lodash/get";
import * as awilix from "awilix";
import {
  OrganizationAttributes,
  UserInstance,
  Db,
} from "../../db/models/db.types";
import errors from "../../errors";

interface UserServiceArgs {
  db: Db;
  currentUser: UserInstance;
  userSettings: any;
}

interface UserServiceMethods {
  findOne: (where: any) => UserInstance;
  getToken: () => string;
  register: (req: any) => { user: string };
}

const makeUserService = ({
  db,
  currentUser,
  userSettings,
}: UserServiceArgs) => {
  const getToken = () => {
    const { JWT_ALGORITHM, JWT_EXPIRY, JWT_SECRET } = process.env;

    const jwtConfig: any = { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRY };

    const { email, firstName, lastName, id } = currentUser;
    const settings = userSettings;

    const jwtPayload = { email, firstName, lastName, settings, id };

    return jwt.sign(jwtPayload, JWT_SECRET, jwtConfig);
  };

  const findOne = (options: any = {}) => {
    const attributes = db.User.getDecryptedAttributes();

    return db.User.findOne({ attributes, ...options });
  };

  const setCurrentUser = (res: any, { user, settings }: any) => {
    res.locals.container.register({
      currentUser: awilix.asValue(user),
      userSettings: awilix.asValue(settings),
    });
  };

  const login = async (req: any, res: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error(errors.authentication.AUTH_NO_P_OR_U);
    }

    const user = await findOne({
      where: { email },
      include: [{ model: db.UserAppPassword }],
    });

    if (!user) {
      throw errors.authentication.AUTH_USER_NOT_FOUND;
    }

    const appPassword = get(
      user,
      "UserAppPasswords[0].password",
      user.password
    );

    const passwordMatchs = await bcrypt.compare(password, appPassword);

    if (!passwordMatchs) {
      throw errors.authentication.AUTH_USER_WRONG_PW;
    }

    setCurrentUser(res, { user });
  };

  const register = async (req: any, res: any) => {
    const { appId } = req.params;
    const { password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));

    let user = await findOne({ where: { email } });

    if (!user) {
      const newUser = req.body;

      if (!appId) {
        newUser.password = hashedPassword;
      }

      await db.User.create(newUser);

      user = await findOne({ where: { email } });
    }

    // if
    //     const appConfig = await db.Setting.create({
    //       appId,
    //       userId: user.id,
    //       password: hashedPassword,
    //       config: '{ foo: "bar" }',
    //     });

    setCurrentUser(res, { user });
  };

  return {
    getToken,
    setCurrentUser,
    findOne,
    login,
    register,
  };
};

export default makeUserService;
