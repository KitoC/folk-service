import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, OrganizationModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const Organization = defineModel("Organization", {
    name: { type: DataTypes.STRING, allowNull: false },
  }) as OrganizationModelStatic & {
    associate: (db: any) => void;
  };

  Organization.associate = function (models: Db) {
    const { User, OrganizationUser } = models;

    Organization.belongsToMany(User, {
      through: OrganizationUser,
      foreignKey: "organizationId",
    });
  };

  return Organization;
};
