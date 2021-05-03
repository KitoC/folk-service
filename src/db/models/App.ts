import { fn, DataTypes, BuildOptions, Model } from "sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, AppModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const App = defineModel(
    "App",
    {
      organizationId: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      secretKey: { type: DataTypes.STRING },
      settingsMap: {
        type: DataTypes.JSONB,
        defaultValue: {},
        allowNull: false,
      },
    },
    { encryptedFields: ["secretKey"] }
  ) as AppModelStatic;

  App.associate = function (models: Db) {
    const { UserAppSetting } = models;

    App.hasMany(UserAppSetting, {
      foreignKey: { allowNull: false, name: "appId" },
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return App;
};
