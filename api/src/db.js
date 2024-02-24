// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
// Files
const userModel = require("./models/User");
const {DB_URL} = process.env;


// Sequelize starter
const sequelize = new Sequelize(DB_URL, {
    logging: false,
});

// Sequelize injection
userModel(sequelize);


// ErrorLog.sync({force: true});


module.exports =
{
    ...sequelize.models,
    models: sequelize.models,
    db: sequelize,
};