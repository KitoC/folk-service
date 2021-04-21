export interface JwtPayload {
  email: string;
  firstName: string;
  lastName: string;
  settings: string;
  id: string;
  appId?: string;
}
