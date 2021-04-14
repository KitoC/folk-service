import dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";
import { LoaderArgs } from "../@types/loader.types";

export default async ({ container }: LoaderArgs) => {
  interface JwtPayload {
    id: number;
  }

  const db = container.cradle.db;

  dotenv.config();

  const jwtSecret = process.env.JWT_SECRET;
  const jwtAlgorithm = process.env.ALGORITHIM;
  const jwtExpiresIn = process.env.JWT_EXPIRY;

  const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm],
    jwtExpiresIn,
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

  // @ts-ignore
  passport.use(db.User.createStrategy());
  // @ts-ignore
  passport.serializeUser(db.User.serializeUser());
  // @ts-ignore
  passport.deserializeUser(db.User.deserializeUser());
};
