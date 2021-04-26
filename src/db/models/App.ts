import { fn, DataTypes, BuildOptions, Model } from "sequelize";

import { Db, SequelizeExtended } from "./db.types";
import utils from "../../utils";

export interface AppAttributes {
  organizationId?: string;
  name?: string;
  secretKey?: any;
}

export interface AppInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  name: string;
  secretKey: any;
  dataValues: any;
}

export type AppModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppInstance) & {
    associate: (db: Db) => void;
    decryptedAttributes: any[];
  };

export default (sequelize: SequelizeExtended, defineModel: any) => {
  const App = defineModel(
    "App",
    {
      organizationId: { type: DataTypes.UUID, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      secretKey: { type: DataTypes.STRING },
    },
    { encryptedFields: ["secretKey"] }
  ) as AppModelStatic;

  return App;
};
