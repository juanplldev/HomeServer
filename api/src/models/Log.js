// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("Log",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        text:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        error:
        {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "-",
        },
    });
};