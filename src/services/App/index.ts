import { AppAttributes, Db } from "../../db/models/db.types";

const makeAppService = ({ db }: { db: Db }) => {
  return {
    create: (params: AppAttributes) => {
      return db.App.create(params);
    },
  };
};

export default makeAppService;
