// Dependencies
// Files
const {User} = require("../database/db");
const {getModel, getModelById, getModelByParam, postModel, putModel, deleteModel} = require("../database/dbMethods");
const {hashPassword} = require("../services/bcrypt");


async function getUser(id)
{
    try
    {
        if(!id)
        {
            return await getModel(User);
        };
        
        return await getModelById(User, id);
    }
    catch(error)
    {
        return error;
    };
};

async function postUser({userName, password, filesPath})
{
    try
    {
        const splittedUserName = userName.trim().split(" ");
        let modifiedUserName = userName;
        
        if(splittedUserName.length === 1)
        {
            modifiedUserName = userName.charAt(0).toUpperCase() + String(userName).slice(1);
        }
        else
        {
            modifiedUserName = splittedUserName[0].at(0).toUpperCase() + splittedUserName[0].slice(1) + " " + splittedUserName[1].at(0).toUpperCase() + splittedUserName[1].slice(1);
        };
        
        const foundUser = await getModelByParam(User, "username", modifiedUserName, "one");
        
        if(foundUser.Error)
        {
            const hashedPassword = await hashPassword(password);
            const content =
            {
                username: modifiedUserName,
                password: hashedPassword,
                isAdmin: false,
                avatar: userName,
                filesPath,
            };
            
            try
            {
                return await postModel(User, content);
            }
            catch(error)
            {
                console.error(error);
            };
        };
    }
    catch(error)
    {
        console.error(error);
    };
};

async function putUser(id, {userName, password, filesPath, pathsToBackup})
{
    try
    {
        const splittedUserName = userName.trim().split(" ");
        let modifiedUserName = userName;
        
        if(splittedUserName.length === 1)
        {
            modifiedUserName = userName.charAt(0).toUpperCase() + String(userName).slice(1);
        }
        else
        {
            modifiedUserName = splittedUserName[0].at(0).toUpperCase() + splittedUserName[0].slice(1) + " " + splittedUserName[1].at(0).toUpperCase() + splittedUserName[1].slice(1);
        };
        
        const foundUser = await getModelByParam(User, "username", modifiedUserName, "one");
        
        if(foundUser.Error || foundUser.dataValues?.id === id)
        {
            const hashedPassword = await hashPassword(password);
            const content =
            {
                username: modifiedUserName,
                password: hashedPassword,
                avatar: userName,
                filesPath,
                pathsToBackup,
            };
            
            return await putModel(User, id, content);
        };
        
        return false;
    }
    catch(error)
    {
        console.error(error);
    };
};

async function deleteUser(id)
{
    try
    {
        const foundUser = await getModelById(User, id);
        
        if(!foundUser.Error)
        {
            return await deleteModel(User, id);
        }
        else
        {
            return foundUser;
        };
    }
    catch(error)
    {
        console.error(error);
    };
};


module.exports =
{
    getUser,
    postUser,
    putUser,
    deleteUser,
};