import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface AppUserSettingAttributes {
  appId?: string;
  userId?: string;
  settings?: string;
}

export interface AppUserSettingInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  userId: string;
  settings: any;
}

export type AppUserSettingModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppUserSettingInstance);

export default (sequelize: SequelizeExtended) => {
  const AppUserSetting = sequelize.defineExtended("AppUserSetting", {
    appId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    settings: { type: DataTypes.UUID, allowNull: false },
  }) as AppUserSettingModelStatic & {
    associate: (db: Db) => void;
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
