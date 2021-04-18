import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface AppAttributes {
  organizationId?: string;
  name?: string;
}

export interface AppInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  name: string;
}

export type AppModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppInstance);

export default (sequelize: SequelizeExtended) => {
  const App = sequelize.defineExtended("App", {
    organizationId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  }) as AppModelStatic & {
    associate: (db: Db) => void;
  };

  // App.associate = function (models) {
  //   App.hasMany(models.Setting, {
  //     foreignKey: { allowNull: false, name: "AppId" },
  //     onDelete: "CASCADE",
  //     hooks: true,
  //   });
  // };

  return App;
};
