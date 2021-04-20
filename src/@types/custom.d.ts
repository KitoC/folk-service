// import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      _container: any;
    }
  }
}

// declare namespace Express {
//   export interface Request {
//     _container: string;
//   }
// }
