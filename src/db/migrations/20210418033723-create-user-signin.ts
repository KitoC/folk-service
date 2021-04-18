import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable("UserSignins", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      meta: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.dropTable("UserSignins");
  },
};
