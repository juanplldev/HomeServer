// Dependencies
require("dotenv").config();
const fs = require("fs");
// Files
const {joinRootPath} = require("../utils/joinPath");
const {EXCLUDED_DIRENTS} = process.env;


async function getDir(userId, dirName)
{
    let foundError = null;
    let dirInfo = {};
    
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
        
        dirInfo =
        {
            path: clientPath,
            content: dirContent,
        };
    }
    catch(error)
    {
        foundError =
        {
            dir: dirName,
            msg: "Error getting directory.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError || dirInfo;
};

async function postDir(userId, dirPath)
{
    if(dirPath)
    {
        let foundError = null;
        
        try
        {
            const {path} = await joinRootPath(userId, dirPath);
            
            await fs.promises.mkdir(path);
        }
        catch(error)
        {
            foundError =
            {
                dir: dirPath,
                msg: "Error creating directory.",
                error,
            };
            
            console.error(foundError);
        };
        
        return foundError;
    };
};

async function putDir(userId, dirPath, dirName)
{
    if(!dirPath || !dirName)
    {
        let foundError = null;
        
        try
        {
            const modPath = dirPath.substring(0, dirPath.lastIndexOf("/")) || "rootDir";
            const oldPath = (await joinRootPath(userId, dirPath))?.path;
            const newPath = (await joinRootPath(userId, modPath, dirName))?.path;
            
            await fs.promises.rename(oldPath, newPath);
        }
        catch(error)
        {
            foundError =
            {
                dir: dirName,
                msg: "Error updating directory.",
                error,
            };
            
            console.error(foundError);
        };
        
        return foundError;
    };
};

async function deleteDir(userId, dirPath)
{
    let foundError = null;
    
    try
    {
        const {path} = await joinRootPath(userId, dirPath);
        
        await fs.promises.rmdir(path, {recursive: true});
    }
    catch(error)
    {
        foundError =
        {
            dir: dirPath,
            msg: "Error deleting directory.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError;
};


module.exports =
{
    getDir,
    postDir,
    putDir,
    deleteDir,
};