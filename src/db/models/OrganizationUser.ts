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

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const OrganizationUser = defineModel("OrganizationUser", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "Organization", key: "id" },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "User", key: "id" },
    },
  }) as OrganizationUserModelStatic & {
    associate: (db: Db) => void;
  };

  OrganizationUser.associate = function (models) {};

  return OrganizationUser;
};
