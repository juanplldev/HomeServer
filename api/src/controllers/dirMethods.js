// Dependencies
const fs = require("fs");
// Files
const {joinRootPath} = require("../rootPath");


async function getDir(userId, dirName)
{
    try
    {
        let foundError = false;
        const {path, clientPath} = await joinRootPath(userId, dirName);
        
        const dir = await fs.promises.opendir(path).catch(e => {foundError = true; return});
        const dirContent =
        {
            files: [],
            directories: [],
        };
        
        if(!foundError)
        {
            for await (const dirent of dir)
            {
                if(dirent.isDirectory())
                {
                    dirContent.directories.push(dirent.name);
                }
                else
                {
                    dirContent.files.push(dirent.name);
                };
            };
            
            dirContent.directories.sort();
            dirContent.files.sort();
            
            const dirInfo =
            {
                path: clientPath,
                content: dirContent,
            };
            
            return dirInfo;
        }
        else
        {
            const error =
            {
                code: "ENOENT",
                message: "Directory does not exist.",
                statusCode: 400,
            };
            
            return {"Error": error};
        };
    }
    catch(error)
    {
        console.error(error);
    };
};

async function postDir(userId, dirPath)
{
    try
    {
        if(!dirPath)
        {
            const error = "Dir path not provided.";
            
            return {"Error": error};
        }
        else
        {
            let foundError = null;
            const {path} = await joinRootPath(userId, dirPath);
            
            await fs.promises.mkdir(path).catch(e => {foundError = true; return});
            
            if(!foundError)
            {
                const dirContent =
                {
                    files: [],
                    directories: [],
                };
                const dirInfo =
                {
                    path: path,
                    content: dirContent,
                };
                
                return dirInfo;
            }
            else
            {
                const error =
                {
                    code: "EEXIST",
                    message: "Directory already exists.",
                    statusCode: 400,
                };
                
                return {"Error": error};
            };
        };
    }
    catch(error)
    {
        console.error(error);
    };
};

async function putDir(userId, dirPath, dirName)
{
    try
    {
        if(!dirPath || !dirName)
        {
            const error = "Dir name or path not provided.";
            
            return {"Error": error};
        }
        else
        {
            let foundError = null;
            const modPath = dirPath.substring(0, dirPath.lastIndexOf("/")) || "rootDir";
            const oldPath = await joinRootPath(userId, dirPath).path;
            const newPath = await joinRootPath(userId, modPath, dirName).path;
            
            await fs.promises.rename(oldPath, newPath).catch(e => {foundError = true; return});
            
            if(!foundError)
            {
                const dirContent =
                {
                    files: [],
                    directories: [],
                };
                const dirInfo =
                {
                    path: newPath,
                    content: dirContent,
                };
                
                return dirInfo;
            }
            else
            {
                const error =
                {
                    code: "ENOENT",
                    message: "Directory does not exist.",
                    statusCode: 400,
                };
                
                return {"Error": error};
            };
        };
    }
    catch(error)
    {
        console.error(error);
    };
};

async function deleteDir(userId, dirPath)
{
    try
    {
        let foundError = null;
        const {path} = await joinRootPath(userId, dirPath);
        
        await fs.promises.rmdir(path, {recursive: true}).catch(e => {foundError = true; return});
        
        if(!foundError)
        {
            const dirContent =
            {
                files: [],
                directories: [],
            };
            const dirInfo =
            {
                path: path,
                content: dirContent,
            };
            
            return dirInfo;
        }
        else
        {
            const error =
            {
                code: "ENOENT",
                message: "Directory does not exist.",
                statusCode: 400,
            };
            
            return {"Error": error};
        };
    }
    catch(error)
    {
        console.error(error);
    };
};


module.exports =
{
    getDir,
    postDir,
    putDir,
    deleteDir,
};