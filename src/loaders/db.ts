import fs from "fs";
import path from "path";
import get from "lodash/get";
import startCase from "lodash/startCase";
import { Sequelize } from "sequelize";
import SequelizeMock from "sequelize-mock";
import { LoaderArgs } from "../@types/loader.types";
import {
  Db,
  GetModelByKeyFunction,
  AddModelToDbFunction,
} from "../@types/db.types";
import utils from "../utils";

const extendSequelize = (sequelize: any) => ({
  ...sequelize,
  defineExtended: (modelName: string, attributes: any, options: any = {}) => {
    const { encryptedFields = [], ...modelOptions } = options;

    // delete options.encryptedFields;

    // ts-ignore
    const Model = sequelize.define(modelName, attributes, modelOptions);

    if (process.env.NODE_ENV === "test") {
      Model.beforeValidate = () => {};
      Model.beforeCreate = () => {};
    }

    Model.beforeValidate(utils.models.addUUID);

    Model.getDecryptedAttributes = () => {
      return [
        ...Object.keys(Model.rawAttributes),
        ...encryptedFields.map((field: string) => [
          sequelize.fn(
            "PGP_SYM_DECRYPT",
            sequelize.cast(sequelize.col(field), "bytea"),
            "AES_KEY"
          ),
          field,
        ]),
      ];
    };

    Model.encryptValue = (value: any) =>
      sequelize.fn("PGP_SYM_ENCRYPT", value, "AES_KEY");

    Model.beforeCreate((record: any) => {
      encryptedFields.forEach((key: string) => {
        if (record[key]) {
          const encryptedValue = Model.encryptValue(record[key]);

          record[key] = encryptedValue;
        }
      });

      return record;
    });

    return Model;
  },
});

export default ({ app, config }: LoaderArgs) => {
  const env = process.env.NODE_ENV || "development";

  let db = {} as Db;
  const getModelByKey: GetModelByKeyFunction = (key) => get(db, key, {});
  const addModelToDb: AddModelToDbFunction = async (file) => {
    const model = require(path.join(modelDir, file)).default(sequelize);
    const key = startCase(model.name).replace(/ /g, "");

    db = { ...db, [key]: model };
  };
  const _config = get(config, `db.${env}`, {});

  const sequelize = extendSequelize(
    env === "test"
      ? new SequelizeMock(process.env[_config.use_env_variable], _config)
      : new Sequelize(process.env[_config.use_env_variable], _config)
  );

  let modelDir: string = "";

  if (__dirname.includes("dist")) {
    modelDir = path.join(process.cwd(), "dist", "src", "db", "models");
  } else {
    modelDir = path.join(process.cwd(), "src", "db", "models");
  }

  fs.readdirSync(modelDir)
    .filter((file) => !["db.types.ts", "db.types.js"].includes(file))
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
