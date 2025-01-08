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

async function postUser({username, password, filesPath})
{
    const splittedUsername = username.trim().split(" ");
    let modifiedUsername = username;
    
    if(splittedUsername.length === 1)
    {
        modifiedUsername = username.charAt(0).toUpperCase() + String(username).slice(1);
    }
    else
    {
        modifiedUsername = splittedUsername[0].at(0).toUpperCase() + splittedUsername[0].slice(1) + " " + splittedUsername[1].at(0).toUpperCase() + splittedUsername[1].slice(1);
    };
    
    try
    {
        const foundUser = await getModelByParam(User, "username", modifiedUsername, "one");
        
        if(foundUser.error) return api_response.error("Error creating user: " + username, "Username not available.");
        
        const hashedPassword = await hashPassword(password);
        const content =
        {
            username: modifiedUsername,
            password: hashedPassword,
            isAdmin: false,
            avatar: username,
            filesPath,
        };
        
        await postModel(User, content);
        
        return api_response.created("User created successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error creating user: " + username, error));
        return api_response.error("Error creating user: " + username, error);
    };
};

async function putUser(id, {username, password, filesPath, pathsToBackup})
{
    const splittedUsername = username.trim().split(" ");
    let modifiedUsername = username;
    
    if(splittedUsername.length === 1)
    {
        modifiedUsername = username.charAt(0).toUpperCase() + String(username).slice(1);
    }
    else
    {
        modifiedUsername = splittedUsername[0].at(0).toUpperCase() + splittedUsername[0].slice(1) + " " + splittedUsername[1].at(0).toUpperCase() + splittedUsername[1].slice(1);
    };
    
    try
    {
        const foundUser = await getModelByParam(User, "username", modifiedUsername, "one");
        
        if(foundUser.error || foundUser.model.dataValues?.id !== id) return api_response.error("Error updating user: " + id, "Username already in use.");
        
        const hashedPassword = await hashPassword(password);
        const content =
        {
            username: modifiedUsername,
            password: hashedPassword,
            avatar: username,
            filesPath,
            pathsToBackup,
        };
        
        await putModel(User, id, content);
        
        return api_response.success("User updated successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error updating user: " + username, error));
        return api_response.error("Error updating user: " + username, error);
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