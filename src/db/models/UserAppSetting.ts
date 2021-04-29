import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface UserAppSettingAttributes {
  appId?: string;
  userId?: string;
  settings?: string;
}

export interface UserAppSettingInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  userId: string;
  settings: any;

  serialize: () => UserAppSettingInstance;
}

export type UserAppSettingModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserAppSettingInstance) & {
    associate: (db: Db) => void;
  };

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const UserAppSetting = defineModel("UserAppSetting", {
    appId: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    settings: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  }) as UserAppSettingModelStatic;

  UserAppSetting.associate = function (models) {
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
