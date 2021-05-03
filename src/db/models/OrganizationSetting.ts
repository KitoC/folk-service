import { DataTypes, BuildOptions, Model } from "sequelize";
import passportLocalSequelize from "passport-local-sequelize";
import utils from "../../utils";

import { Db, SequelizeExtended, OrganizationSettingModelStatic } from "./types";

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const OrganizationSetting = defineModel("OrganizationSetting", {
    organizationId: { type: DataTypes.UUID, allowNull: false },
    settings: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  }) as OrganizationSettingModelStatic & {
    associate: (db: any) => void;
  };

  // OrganizationSetting.associate = function (models) {
  //   OrganizationSetting.hasMany(models.Setting, {
  //     foreignKey: { allowNull: false, name: "OrganizationSettingId" },
  //     onDelete: "CASCADE",
  //     hooks: true,
  //   });
  // };

  return OrganizationSetting;
};
