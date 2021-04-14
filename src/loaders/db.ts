import fs from "fs";
import path from "path";
import get from "lodash/get";
import startCase from "lodash/startCase";
import { Sequelize } from "sequelize";
import { LoaderArgs } from "../@types/loader.types";
import {
  Db,
  GetModelByKeyFunction,
  AddModelToDbFunction,
} from "../@types/db.types";

export default ({ app, config }: LoaderArgs) => {
  const env = process.env.NODE_ENV || "development";

  let db = {} as Db;
  const getModelByKey: GetModelByKeyFunction = (key) => get(db, key, {});
  const addModelToDb: AddModelToDbFunction = async (file) => {
    const model = require(path.join(modelDir, file)).default(sequelize);

    db = { ...db, [startCase(model.name).replace(" ", "")]: model };
  };
  const _config = get(config, `db.${env}`, {});

  const sequelize = new Sequelize(
    process.env[_config.use_env_variable],
    _config
  );

  const modelDir = path.join(process.cwd(), "src", "db", "models");

  fs.readdirSync(modelDir)
    .filter((file) => !["db.types.ts"].includes(file))
    .forEach(addModelToDb);

  Object.keys(db).forEach((modelName) => {
    if (getModelByKey(modelName).associate) {
      getModelByKey(modelName).associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
