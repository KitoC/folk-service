import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, UserAppSettingModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const UserAppSetting = defineModel("UserAppSetting", {
    appId: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    settings: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  }) as UserAppSettingModelStatic;

  UserAppSetting.associate = function (models: Db) {
    UserAppSetting.belongsTo(models.User, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "userId" },
      onDelete: "CASCADE",
      hooks: true,
    });

    UserAppSetting.belongsTo(models.App, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "appId" },
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  utils.models.addSettingsHooks(UserAppSetting);

  return UserAppSetting;
};
