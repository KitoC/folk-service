import { RequestHandler } from "express";
import dotenv from "dotenv";
import passport from "passport";
// import LocalStrategy from "passport-local";
import passportJWT from "passport-jwt";
import { LoaderArgs } from "../@types/loader.types";
import { UserInstance } from "../db/models/types";
import errors from "../errors";
import utils from "../utils";

export default async ({ container }: LoaderArgs) => {
  const { db, AuthenticationService } = container.cradle;

  dotenv.config();

  const { JWT_ALGORITHM, JWT_EXPIRY } = process.env;

  const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    algorithms: [JWT_ALGORITHM],
    jwtExpiresIn: JWT_EXPIRY,
    secretOrKeyProvider: AuthenticationService.secretProvider,
    passReqToCallback: true,
  } as any;

  passport.use(
    new passportJWT.Strategy(jwtOptions, AuthenticationService.jwtStrategy)
  );

  // passport.use(
  //   new LocalStrategy(
  //     (
  //       email: string,
  //       password: string,
  //       done: (arg1: any, arg2: any) => void
  //     ) => {
  //       db.User.findOne(
  //         { where: { email } },
  //         function (err: Error, user: UserInstance) {
  //           if (err) {
  //             return done(err);
  //           }

  //           if (!user) {
  //             return done(null, false);
  //           }

  //           if (!user.verifyPassword(password)) {
  //             return done(null, false);
  //           }

  //           return done(null, user);
  //         }
  //       );
  //     }
  //   )
  // );

  // @ts-ignore
  // passport.use(db.User.createStrategy());
  // // @ts-ignore
  // passport.serializeUser(db.User.serializeUser());
  // // @ts-ignore
  // passport.deserializeUser(db.User.deserializeUser());
};
