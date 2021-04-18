import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.sequelize.query("CREATE EXTENSION pgcrypto;");
  },

  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.sequelize.query("DROP EXTENSION pgcrypto;");
  },
};
