import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, AppSettingModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const AppSetting = defineModel("AppSetting", {
    appId: { type: DataTypes.UUID, allowNull: false },
    settings: { type: DataTypes.JSONB, allowNull: false },
  }) as AppSettingModelStatic & {
    associate: (db: any) => void;
  };

  // AppSetting.associate = function (models) {
  //   AppSetting.hasMany(models.Setting, {
  //     foreignKey: { allowNull: false, name: "AppSettingId" },
  //     onDelete: "CASCADE",
  //     hooks: true,
  //   });
  // };

  return AppSetting;
};
