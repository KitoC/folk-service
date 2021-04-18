import { QueryInterface } from "sequelize";

export = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    await queryInterface.createTable("OrganizationUsers", {
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
      userId: {
        type: Sequelize.UUID,
        references: { model: "Users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("OrganizationUsers");
  },
};
