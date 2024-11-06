// Dependencies
const {DataTypes} = require("sequelize");

module.exports = sequelize =>
{
    sequelize.define("User",
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userName:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    });
};