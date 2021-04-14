import { Sequelize, DataTypes, BuildOptions, Model } from "sequelize";
import { Db } from "./db.types";

export interface AppConfigAttributes {
  appId?: string;
  userId?: string;
  config?: string; // actually a json column
}

export interface AppConfigInstance extends Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  userId: string;
  config: string; // actually a json column
}

export type AppConfigModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppConfigInstance);

export default (sequelize: Sequelize) => {
  var AppConfig = sequelize.define("AppConfig", {
    appId: DataTypes.STRING,
    userId: DataTypes.STRING,
    config: DataTypes.JSON,
  }) as AppConfigModelStatic & {
    associate: (db: Db) => void;
    createStrategy?: () => void;
  };

  AppConfig.associate = function (models) {
    // associations can be defined here
  };

  return AppConfig;
};
