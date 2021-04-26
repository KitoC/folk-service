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
}

export type UserAppSettingModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserAppSettingInstance);

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const UserAppSetting = defineModel("UserAppSetting", {
    appId: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    settings: { type: DataTypes.JSON, allowNull: false },
  }) as UserAppSettingModelStatic & {
    associate: (db: Db) => void;
  };

  UserAppSetting.associate = function (models) {
    UserAppSetting.belongsTo(models.User, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "userId" },
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return UserAppSetting;
};
