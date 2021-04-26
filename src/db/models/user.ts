import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended, UserAppPasswordInstance } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  UserAppPasswords: UserAppPasswordInstance[];
}

export type UserModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserInstance) & {
    associate: (db: Db) => void;
    createStrategy?: () => void;
    serializeUser?: () => void;
    deserializeUser?: () => void;
    decryptedAttributes: any[];
  };

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const User = defineModel(
    "User",
    {
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: DataTypes.STRING,
    },
    { encryptedFields: ["firstName", "lastName"] }
  ) as UserModelStatic;

  User.associate = function (models) {
    const {
      Organization,
      OrganizationUser,
      UserAppSetting,
      UserAppPassword,
    } = models;

    User.hasMany(UserAppSetting, {
      foreignKey: { allowNull: false, name: "userId" },
      onDelete: "CASCADE",
      hooks: true,
    });

    User.hasMany(UserAppPassword, {
      foreignKey: { allowNull: false, name: "userId" },
      onDelete: "CASCADE",
      hooks: true,
    });

    User.belongsToMany(Organization, {
      through: OrganizationUser,
      foreignKey: "userId",
    });
  };

  return User;
};
