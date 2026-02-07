const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "warranty_db",     // database name
  "postgres",        // username
  "admin",   // 
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;
