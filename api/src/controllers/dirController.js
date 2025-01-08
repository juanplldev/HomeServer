// Dependencies
const fs = require("node:fs");
// Files
const api_response = require("../services/api_response");
const {joinRootPath} = require("../utils/joinPath");
const {EXCLUDED_DIRENTS} = process.env;


async function getDir(userId, dirName)
{
    try
    {
        const {path, clientPath} = await joinRootPath(userId, dirName);
        
        const dir = await fs.promises.opendir(path);
        const dirContent =
        {
            files: [],
            directories: [],
        };
        
        const excludedDirents = EXCLUDED_DIRENTS.split(", ");
        
        for await (const dirent of dir)
        {
            if(!dirent.name.startsWith("."))
            {
                if(dirent.isDirectory() && !excludedDirents.includes(dirent.name))
                {
                    dirContent.directories.push(dirent.name);
                }
                else if(dirent.isFile())
                {
                    dirContent.files.push(dirent.name);
                };
            };
        };
        
        dirContent.directories.sort();
        dirContent.files.sort();
        
        const dirInfo =
        {
            path: clientPath,
            content: dirContent,
        };
        
        return api_response.success("Directory read successfully.", dirInfo);
    }
    catch(error)
    {
        console.error(api_response.error("Error getting directory: /" + dirName, error));
        return api_response.error("Error getting directory: /" + dirName, error);
    };
};

async function postDir(userId, dirPath)
{
    if(dirPath)
    {
        try
        {
            const {path} = await joinRootPath(userId, dirPath);
            
            await fs.promises.mkdir(path);
            
            return api_response.created("Directory created successfully.");
        }
        catch(error)
        {
            console.error(api_response.error("Error creating directory: /" + dirPath, error));
            return api_response.error("Error creating directory: /" + dirPath, error);
        };
    };
    
    return api_response.error("Provide directory path.");
};

async function putDir(userId, dirPath, dirName)
{
    if(dirPath && dirName)
    {
        try
        {
            const modPath = dirPath.substring(0, dirPath.lastIndexOf("/")) || "rootDir";
            const oldPath = (await joinRootPath(userId, dirPath))?.path;
            const newPath = (await joinRootPath(userId, modPath, dirName))?.path;
            
            await fs.promises.rename(oldPath, newPath);
            
            return api_response.success("Directory updated successfully.");
        }
        catch(error)
        {
            console.error(api_response.error("Error updating directory: /" + dirName, error));
            return api_response.error("Error updating directory: /" + dirName, error);
        };
    };
    
    return api_response.error("Provide directory path and directory name.");
};

async function deleteDir(userId, dirPath)
{
    try
    {
        const {path} = await joinRootPath(userId, dirPath);
        
        await fs.promises.rmdir(path, {recursive: true});
        
        return api_response.success("Directory deleted successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error deleting directory: /" + dirPath, error));
        return api_response.error("Error deleting directory: /" + dirPath, error);
    };
};


module.exports =
{
    getDir,
    postDir,
    putDir,
    deleteDir,
};