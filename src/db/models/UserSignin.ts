import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, UserSigninModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const UserSignin = defineModel("UserSignin", {
    meta: { type: DataTypes.STRING, allowNull: false },
  }) as UserSigninModelStatic & {
    associate: (db: any) => void;
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
