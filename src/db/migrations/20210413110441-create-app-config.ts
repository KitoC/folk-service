import { QueryInterface } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable("AppConfigs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      appId: {
        type: Sequelize.STRING,
      },

      userId: {
        type: Sequelize.STRING,
      },

      config: {
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

  down: (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable("AppConfigs");
  },
};
