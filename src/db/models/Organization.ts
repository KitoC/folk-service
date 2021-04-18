import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended, OrganizationUserAttributes } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface OrganizationAttributes {
  name?: string;
  OrganizationUsers?: OrganizationUserAttributes[];
}

export interface OrganizationInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  name: string;
}

export type OrganizationModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => OrganizationInstance);

export default (sequelize: SequelizeExtended) => {
  const Organization = sequelize.defineExtended("Organization", {
    name: { type: DataTypes.STRING, allowNull: false },
  }) as OrganizationModelStatic & {
    associate: (db: Db) => void;
  };

  Organization.associate = function (models) {
    const { User, OrganizationUser } = models;

    Organization.belongsToMany(User, {
      through: OrganizationUser,
      foreignKey: "organizationId",
    });
  };

  return Organization;
};
