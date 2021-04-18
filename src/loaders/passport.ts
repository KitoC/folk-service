import dotenv from "dotenv";
import passport from "passport";
// import LocalStrategy from "passport-local";
import passportJWT from "passport-jwt";
import { LoaderArgs } from "../@types/loader.types";
import { UserInstance } from "../db/models/user";

export default async ({ container }: LoaderArgs) => {
  interface JwtPayload {
    id: number;
  }

  const db = container.cradle.db;

  dotenv.config();

  const { JWT_ALGORITHM, JWT_EXPIRY, JWT_SECRET } = process.env;

  const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    algorithms: [JWT_ALGORITHM],
    jwtExpiresIn: JWT_EXPIRY,
    passReqToCallback: true,
  } as any;

  passport.use(
    new passportJWT.Strategy(
      jwtOptions,
      async (req: any, jwtPayload: JwtPayload, next: any) => {
        try {
          const user = await db.User.findOne({ where: { id: jwtPayload.id } });

          if (user) {
            next(null, user);
          }
        } catch (error) {
          next(error);
        }
      }
    )
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
