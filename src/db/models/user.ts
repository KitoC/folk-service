import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, UserModelStatic } from "./types";

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

  User.associate = function (models: Db) {
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
