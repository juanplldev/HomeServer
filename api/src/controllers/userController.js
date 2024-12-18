// Dependencies
// Files
const {User} = require("../database/db");
const {getModel, getModelById, getModelByParam, postModel, putModel, deleteModel} = require("../database/dbMethods");
const {hashPassword} = require("../services/bcrypt");


async function getUser(id)
{
    let foundError = null;
    let userInfo = {};
    
    try
    {
        if(!id)
        {
            userInfo = await getModel(User);
        }
        else
        {
            userInfo = await getModelById(User, id);
        };
        
        if(userInfo.Error)
        {
            foundError =
            {
                user: id,
                msg: "Error getting user.",
                error: userInfo.Error,
            };
        };
    }
    catch(error)
    {
        foundError =
        {
            user: id,
            msg: "Error getting user.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError || userInfo;
};

async function postUser({userName, password, filesPath})
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
    
    let foundError = null;
    
    try
    {
        const foundUser = await getModelByParam(User, "username", modifiedUserName, "one");
        
        if(!foundUser.Error) return "Username not available.";
        
        const hashedPassword = await hashPassword(password);
        const content =
        {
            username: modifiedUserName,
            password: hashedPassword,
            isAdmin: false,
            avatar: userName,
            filesPath,
        };
        
        await postModel(User, content);
    }
    catch(error)
    {
        foundError =
        {
            user: userName,
            msg: "Error creating user.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError;
};

async function putUser(id, {userName, password, filesPath, pathsToBackup})
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
    
    let foundError = null;
    
    try
    {
        const foundUser = await getModelByParam(User, "username", modifiedUserName, "one");
        
        if(!foundUser.Error && foundUser.dataValues?.id !== id) return "Username already in use.";
        
        const hashedPassword = await hashPassword(password);
        const content =
        {
            username: modifiedUserName,
            password: hashedPassword,
            avatar: userName,
            filesPath,
            pathsToBackup,
        };
        
        await putModel(User, id, content);
    }
    catch(error)
    {
        foundError =
        {
            user: userName,
            msg: "Error updating user.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError;
};

async function deleteUser(id)
{
    let foundError = null;
    
    try
    {
        const foundUser = await getModelById(User, id);
        
        if(foundUser.Error) return "User not found.";
        
        await deleteModel(User, id);
    }
    catch(error)
    {
        foundError =
        {
            user: id,
            msg: "Error deleting user.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError;
};


module.exports =
{
    getUser,
    postUser,
    putUser,
    deleteUser,
};