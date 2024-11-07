require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  development: {
    username: process.env.RDS_USERNAME || process.env.DB_USERNAME,
    password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD,
    database: process.RDS_DB_NAME || process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.RDS_HOSTNAME || process.env.DB_HOST,
    port: process.env.RDS_PORT || process.env.DB_PORT || 3306,
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
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
