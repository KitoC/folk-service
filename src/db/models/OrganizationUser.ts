import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, OrganizationUserModelStatic } from "./types";

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
    associate: (db: any) => void;
  };

  OrganizationUser.associate = function (models: Db) {};

  return OrganizationUser;
};
