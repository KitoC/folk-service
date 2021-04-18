import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface UserAppPasswordAttributes {
  appId: string;
  userId: string;
  password: string;
}

export interface UserAppPasswordInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  userId: string;
  password: string;
}

export type UserAppPasswordModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserAppPasswordInstance);

export default (sequelize: SequelizeExtended) => {
  const UserAppPassword = sequelize.defineExtended("UserAppPassword", {
    appId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }) as UserAppPasswordModelStatic & {
    associate: (db: Db) => void;
  };

  UserAppPassword.associate = function (models) {
    const { User } = models;

    UserAppPassword.belongsTo(User, {
      foreignKey: { allowNull: false, name: "userId" },
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return UserAppPassword;
};
