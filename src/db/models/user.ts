import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import { Db } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";

export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface UserInstance extends Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
}

export type UserModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserInstance);

export default (sequelize: Sequelize) => {
  var User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  }) as UserModelStatic & {
    associate: (db: Db) => void;
    createStrategy?: () => void;
    serializeUser?: () => void;
    deserializeUser?: () => void;
  };

  User.associate = function (models) {
    // associations can be defined here
  };

  passportLocalSequelize.attachToUser(User, {
    usernameField: "email",
    hash: "password",
  });

  return User;
};
