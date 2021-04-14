const shared = {
  dialect: "postgres",
};

export default {
  development: { ...shared, use_env_variable: "DATABASE_URL" },
  test: { ...shared, use_env_variable: "DATABASE_URL_TEST", logging: false },
  production: { ...shared, use_env_variable: "DATABASE_URL" },
};
