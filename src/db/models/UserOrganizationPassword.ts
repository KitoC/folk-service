import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import {
  Db,
  SequelizeExtended,
  UserOrganizationPasswordModelStatic,
} from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const UserOrganizationPassword = defineModel("UserOrganizationPassword", {
    organizationId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }) as UserOrganizationPasswordModelStatic & {
    associate: (db: any) => void;
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
