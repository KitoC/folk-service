import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, AppUserSettingModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const AppUserSetting = defineModel("AppUserSetting", {
    appId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    settings: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  }) as AppUserSettingModelStatic & {
    associate: (db: any) => void;
  };

  // AppUserSetting.associate = function (models) {
  //   AppUserSetting.hasMany(models.Setting, {
  //     foreignKey: { allowNull: false, name: "AppUserSettingId" },
  //     onDelete: "CASCADE",
  //     hooks: true,
  //   });
  // };

  return AppUserSetting;
};
