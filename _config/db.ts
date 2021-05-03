require("dotenv").config();

const shared = {
  dialect: "postgres",
};

export = {
  development: {
    ...shared,
    use_env_variable: "DATABASE_URL",
    logging: true,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  test: { ...shared, use_env_variable: "DATABASE_URL_TEST", logging: false },
  production: { ...shared, use_env_variable: "DATABASE_URL" },
};
