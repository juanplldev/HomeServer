// Files
const User = require("../database/models/User");
const api_response = require("../services/api_response");
const {getModel, getModelById, getModelByParam, postModel, putModel, deleteModel} = require("../database/dbMethods");
const {hashPassword} = require("../services/bcrypt");


async function getUser(id)
{
    try
    {
        let userInfo = {};
        
        if(!id) userInfo = await getModel(User);
        else userInfo = await getModelById(User, id);
        
        if(userInfo.error)
        {
            console.error(api_response.error("Error getting user: " + id, userInfo.error));
            return api_response.error("Error getting user: " + id, userInfo.error);
        };
        
        return api_response.success("User read successfully.", userInfo.model);
    }
    catch(error)
    {
        console.error(api_response.error("Error getting user: " + id, error));
        return api_response.error("Error getting user: " + id, error);
    };
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
    
    try
    {
        const foundUser = await getModelByParam(User, "username", modifiedUserName, "one");
        
        if(foundUser.error) return api_response.error("Error creating user: " + userName, "Username not available.");
        
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
        
        return api_response.created("User created successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error creating user: " + userName, error));
        return api_response.error("Error creating user: " + userName, error);
    };
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
    
    try
    {
        const foundUser = await getModelByParam(User, "username", modifiedUserName, "one");
        
        if(foundUser.error || foundUser.model.dataValues?.id !== id) return api_response.error("Error updating user: " + id, "Username already in use.");
        
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
        
        return api_response.success("User updated successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error updating user: " + userName, error));
        return api_response.error("Error updating user: " + userName, error);
    };
};

async function deleteUser(id)
{
    try
    {
        const foundUser = await getModelById(User, id);
        
        if(foundUser.error) return api_response.error("Error deleting user: " + id, "User not found.");
        
        await deleteModel(User, id);
        
        return api_response.success("User deleted successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error deleting user: " + id, error));
        return api_response.error("Error deleting user: " + id, error);
    };
};


module.exports =
{
    getUser,
    postUser,
    putUser,
    deleteUser,
};