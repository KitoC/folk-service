import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable("Apps", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      organizationId: {
        type: Sequelize.UUID,
        references: { model: "Organizations", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      secretKey: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      settingsMap: {
        type: Sequelize.JSONB,
        defaultValue: {},
        allowNull: false,
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
    await queryInterface.dropTable("Apps");
  },
};
