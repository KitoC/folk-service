import * as awilix from "awilix";
import { LoaderArgs } from "../@types/loader.types";

export default ({ app, registerModules = () => {} }: LoaderArgs) => {
  const container = awilix.createContainer();

  container.loadModules(["services/**/*.js"], {
    formatName: "camelCase",
    resolverOptions: { register: awilix.asFunction },
  });

  container.register(registerModules(awilix));

  app.use((req, res, next) => {
    res.locals.container = container;

    next();
  });

  return container;
};
