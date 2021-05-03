import { Db } from "../db/models/db.types";
// import { UserInstance } from "../db/models/User";
import { AppInstance } from "../db/models/App";

export interface UserService {
  findOne: (where: any) => any;
  register: (req: any) => { user: string };
}

export interface Container {
  db: Db;
  UserService: UserService;
  currentUser: any;
  userSettings: any;
}
