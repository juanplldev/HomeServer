// Dependencies
const {DataTypes} = require("sequelize");
const sequelize = require("../sequelize");


const User = sequelize.define("User", {
    id:
    {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username:
    {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(name)
        {
            const splittedName = name.trim().split(" ");
            
            if(splittedName.length === 1)
            {
                const capitalizedLetter = name.charAt(0).toUpperCase() + String(name).slice(1);
                
                this.setDataValue("username", capitalizedLetter);
            }
            else
            {
                const capitalizedLetters = splittedName[0].at(0).toUpperCase() + splittedName[0].slice(1) + " " + splittedName[1].at(0).toUpperCase() + splittedName[1].slice(1);
                
                this.setDataValue("username", capitalizedLetters);
            };
        },
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
    avatar:
    {
        type: DataTypes.STRING,
        allowNull: false,
        set(username)
        {
            const avatar = `https://avatar.oxro.io/avatar.svg?name=${username}&caps=1&isRounded=true`;
            
            this.setDataValue("avatar", avatar);
        },
    },
    filesPath:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pathsToBackup:
    {
        type: DataTypes.ARRAY(DataTypes.TEXT),
    },
},
{
    timestamps: true,
});


module.exports = User;