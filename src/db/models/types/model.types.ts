import { BuildOptions, Model } from "sequelize";

// App
export interface AppAttributes {
  organizationId?: string;
  name?: string;
  secretKey?: any;
  settingsMap?: any;
}

export interface AppInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  name: string;
  secretKey: any;
  settingsMap: any;
  dataValues: any;
}

export type AppModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppInstance) & {
    associate: (db: any) => void;
    decryptedAttributes: any[];
  };

// AppSetting
export interface AppSettingAttributes {
  appId?: string;
  settings: any;
}

export interface AppSettingInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  settings: any;
}

export type AppSettingModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppSettingInstance);

// AppUserSetting
export interface AppUserSettingAttributes {
  appId?: string;
  userId?: string;
  settings?: string;
}

export interface AppUserSettingInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  userId: string;
  settings: any;
}

export type AppUserSettingModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => AppUserSettingInstance);

// Organization
export interface OrganizationAttributes {
  name?: string;
  OrganizationUsers?: OrganizationUserAttributes[];
}

export interface OrganizationInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  name: string;
}

export type OrganizationModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => OrganizationInstance);

// OrganizationSetting
export interface OrganizationSettingAttributes {
  organizationId?: string;
  settings?: string;
}

export interface OrganizationSettingInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  settings: any;
}

export type OrganizationSettingModelStatic = typeof Model &
  (new (
    values?: object,
    options?: BuildOptions
  ) => OrganizationSettingInstance);

// OrganizationUser
export interface OrganizationUserAttributes {
  organizationId?: string;
  userId?: string;
}

export interface OrganizationUserInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  userId: string;
}

export type OrganizationUserModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => OrganizationUserInstance);

// User
export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  password: string;
  UserAppPasswords: UserAppPasswordInstance[];
}

export type UserModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserInstance) & {
    associate: (db: any) => void;
    createStrategy?: () => void;
    serializeUser?: () => void;
    deserializeUser?: () => void;
    decryptedAttributes: any[];
  };

// UserAppPassword
export interface UserAppPasswordAttributes {
  appId: string;
  userId: string;
  password: string;
}

export interface UserAppPasswordInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  userId: string;
  password: string;
}

export type UserAppPasswordModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserAppPasswordInstance);

// UserAppSetting
export interface UserAppSettingAttributes {
  appId?: string;
  userId?: string;
  settings?: string;
}

export interface UserAppSettingInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  appId: string;
  userId: string;
  settings: any;

  serialize: () => UserAppSettingInstance;
}

export type UserAppSettingModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UserAppSettingInstance) & {
    associate: (db: any) => void;
  };

// UserOrganizationPassword
export interface UserOrganizationPasswordAttributes {
  organizationId?: string;
  userId?: string;
  password?: string;
}

export interface UserOrganizationPasswordInstance extends Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  organizationId: string;
  userId: string;
  password: string;
}

export type UserOrganizationPasswordModelStatic = typeof Model &
  (new (
    values?: object,
    options?: BuildOptions
  ) => UserOrganizationPasswordInstance);

// UserSignin
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
