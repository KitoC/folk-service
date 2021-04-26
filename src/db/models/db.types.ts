import { Sequelize, Model, ModelAttributes, ModelOptions } from "sequelize";

import { AppModelStatic } from "./App";
import { AppSettingModelStatic } from "./AppSetting";
import { AppUserSettingModelStatic } from "./AppUserSetting";
import { OrganizationUserModelStatic } from "./OrganizationUser";
import { OrganizationModelStatic } from "./Organization";
import { OrganizationSettingModelStatic } from "./OrganizationSetting";
import { UserModelStatic } from "./User";
import { UserAppPasswordModelStatic } from "./UserAppPassword";
import { UserAppSettingModelStatic } from "./UserAppSetting";
import { UserOrganizationPasswordModelStatic } from "./UserOrganizationPassword";
import { UserSigninModelStatic } from "./UserSignin";

export * from "./App";
export * from "./AppSetting";
export * from "./AppUserSetting";
export * from "./OrganizationUser";
export * from "./Organization";
export * from "./OrganizationSetting";
export * from "./User";
export * from "./UserAppPassword";
export * from "./UserAppSetting";
export * from "./UserOrganizationPassword";
export * from "./UserSignin";

export interface ModelOptionsExtended extends ModelOptions {
  encryptedFields: string[];
}

export interface SequelizeExtended extends Sequelize {}

export interface Db {
  transaction: any;
  sequelize: SequelizeExtended;
  Sequelize: any;
  App: AppModelStatic;
  AppSetting: AppSettingModelStatic;
  AppUserSetting: AppUserSettingModelStatic;
  OrganizationUser: OrganizationUserModelStatic;
  Organization: OrganizationModelStatic;
  OrganizationSetting: OrganizationSettingModelStatic;
  User: UserModelStatic;
  UserAppPassword: UserAppPasswordModelStatic;
  UserAppSetting: UserAppSettingModelStatic;
  UserOrganizationPassword: UserOrganizationPasswordModelStatic;
  UserSignin: UserSigninModelStatic;
}
