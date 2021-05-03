import { Sequelize, Model, ModelAttributes, ModelOptions } from "sequelize";

import {
  AppModelStatic,
  AppSettingModelStatic,
  AppUserSettingModelStatic,
  OrganizationUserModelStatic,
  OrganizationModelStatic,
  OrganizationSettingModelStatic,
  UserModelStatic,
  UserAppPasswordModelStatic,
  UserAppSettingModelStatic,
  UserOrganizationPasswordModelStatic,
  UserSigninModelStatic,
} from "./model.types";

// import { AppModelStatic } from "./App";
// import { AppSettingModelStatic } from "./AppSetting";
// import { AppUserSettingModelStatic } from "./AppUserSetting";
// import { OrganizationUserModelStatic } from "./OrganizationUser";
// import { OrganizationModelStatic } from "./Organization";
// import { OrganizationSettingModelStatic } from "./OrganizationSetting";
// import { UserModelStatic } from "./User";
// import { UserAppPasswordModelStatic } from "./UserAppPassword";
// import { UserAppSettingModelStatic } from "./UserAppSetting";
// import { UserOrganizationPasswordModelStatic } from "./UserOrganizationPassword";
// import { UserSigninModelStatic } from "./UserSignin";

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
  User: any;
  UserAppPassword: UserAppPasswordModelStatic;
  UserAppSetting: UserAppSettingModelStatic;
  UserOrganizationPassword: UserOrganizationPasswordModelStatic;
  UserSignin: UserSigninModelStatic;
}
