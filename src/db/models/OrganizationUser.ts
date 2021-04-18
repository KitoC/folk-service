import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface OrganizationUserAttributes {
  organizationId?: string;
  userId?: string;
}

export interface OrganizationUserInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  userId: string;
}

export type OrganizationUserModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => OrganizationUserInstance);

export default (sequelize: SequelizeExtended) => {
  const OrganizationUser = sequelize.defineExtended("OrganizationUser", {
    organizationId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  }) as OrganizationUserModelStatic & {
    associate: (db: Db) => void;
  };

  // OrganizationUser.associate = function (models) {
  //   OrganizationUser.hasMany(models.Setting, {
  //     foreignKey: { allowNull: false, name: "OrganizationUserId" },
  //     onDelete: "CASCADE",
  //     hooks: true,
  //   });
  // };

  return OrganizationUser;
};
