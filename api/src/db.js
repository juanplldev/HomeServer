// Dependencies
require("dotenv").config();
const {Sequelize} = require("sequelize");
const fs = require("fs");
const path = require("path");
// Files
const {DB_URL} = process.env;
// Models import
const modelsRoute = path.join(__dirname + "/models");
const allModels = fs.readdirSync(modelsRoute);
const models = [];

allModels.forEach(e => {
    const modelRequire = require(path.join(modelsRoute, e));
    models.push(modelRequire);
});

// Sequelize starter
const sequelize = new Sequelize(DB_URL, {
    logging: false,
});

// Sequelize injection
models.forEach(model => model(sequelize));

// RELATIONS
const {User, Log} = sequelize.models;

// User and Game
User.belongsToMany(Log, {through: "User/Log"});
Log.belongsToMany(User, {through: "User/Log"});


// ErrorLog.sync({force: true});


module.exports =
{
    ...sequelize.models,
    models: sequelize.models,
    db: sequelize,
};