import { DataTypes, BuildOptions, Model } from "sequelize";
import { Db, SequelizeExtended } from "./db.types";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

export interface UserSigninAttributes {
  meta?: string;
}

export interface UserSigninInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  meta: string;
}

export type UserSigninModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserSigninInstance);

export default (sequelize: SequelizeExtended) => {
  const UserSignin = sequelize.defineExtended("UserSignin", {
    meta: { type: DataTypes.STRING, allowNull: false },
  }) as UserSigninModelStatic & {
    associate: (db: Db) => void;
  };

  // UserSignin.associate = function (models) {
  //   UserSignin.hasMany(models.Setting, {
  //     foreignKey: { allowNull: false, meta: "UserSigninId" },
  //     onDelete: "CASCADE",
  //     hooks: true,
  //   });
  // };

  return UserSignin;
};
