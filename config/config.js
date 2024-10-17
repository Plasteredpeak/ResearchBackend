require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    host: process.env.TEST_DB_HOST,
    dialect: process.env.TEST_DB_DIALECT || "mysql",

    port: process.env.TEST_DB_PORT || 3306,
    dialectOptions: {
      insecureAuth: true,
    },
  },

  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    logging: process.env.DB_CONSOLE_LOGGING == 1,
    dialect: process.env.PROD_DB_DIALECT || "mysql",
    port: process.env.PROD_DB_PORT || 3306,
  },
};
