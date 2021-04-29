import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface AppSettingAttributes {
  appId?: string;
  settings: any;
}

export interface AppSettingInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  settings: any;
}

export type AppSettingModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppSettingInstance);

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const AppSetting = defineModel("AppSetting", {
    appId: { type: DataTypes.UUID, allowNull: false },
    settings: { type: DataTypes.JSONB, allowNull: false },
  }) as AppSettingModelStatic & {
    associate: (db: Db) => void;
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
