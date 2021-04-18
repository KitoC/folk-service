import * as awilix from "awilix";
import { LoaderArgs } from "../@types/loader.types";

export default ({ app, registerModules = () => {} }: LoaderArgs) => {
  const container = awilix.createContainer();

  container.loadModules(
    ["src/services/**/index.js", "src/services/**/index.ts"],
    {
      formatName: (ignore: string, { path }: any) => {
        const [fileName, serviceName] = path.split("/").reverse();

        return `${serviceName}Service`;
      },
      resolverOptions: { register: awilix.asFunction },
    }
  );

  container.register({
    currentUser: awilix.asValue(null),
    userSettings: awilix.asValue(null),
  });

  container.register(registerModules(awilix));

  app.use((req, res, next) => {
    res.locals.container = container;

    next();
  });

  return container;
};
