import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface UserOrganizationPasswordAttributes {
  organizationId?: string;
  userId?: string;
  password?: string;
}

export interface UserOrganizationPasswordInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  userId: string;
  password: string;
}

export type UserOrganizationPasswordModelStatic = typeof Model &
  (new (
    values?: object,
    options?: BuildOptions
  ) => UserOrganizationPasswordInstance);

export default (sequelize: SequelizeExtended) => {
  const UserOrganizationPassword = sequelize.defineExtended(
    "UserOrganizationPassword",
    {
      organizationId: { type: DataTypes.UUID, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    }
  ) as UserOrganizationPasswordModelStatic & {
    associate: (db: Db) => void;
  };

  // UserOrganizationPassword.associate = function (models) {
  //   UserOrganizationPassword.hasMany(models.Setting, {
  //     foreignKey: { allowNull: false, name: "UserOrganizationPasswordId" },
  //     onDelete: "CASCADE",
  //     hooks: true,
  //   });
  // };

  return UserOrganizationPassword;
};
