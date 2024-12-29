// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
// Files
const {DB_NAME, DB_USER, DB_PASSWORD} = process.env;


// Sequelize starter
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
    logging: false,
});


module.exports = sequelize;