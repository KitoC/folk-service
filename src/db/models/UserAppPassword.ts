import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, UserAppPasswordModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const UserAppPassword = defineModel("UserAppPassword", {
    appId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }) as UserAppPasswordModelStatic & {
    associate: (db: any) => void;
  };

  UserAppPassword.associate = function (models: Db) {
    const { User } = models;

    UserAppPassword.belongsTo(User, {
      foreignKey: { allowNull: false, name: "userId" },
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return UserAppPassword;
};
