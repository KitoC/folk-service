import { Sequelize } from "sequelize";
import { UserModelStatic } from "./user";
import { AppConfigModelStatic } from "./appconfig";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
  Columns: AppConfigModelStatic;
  Users: UserModelStatic;
}
