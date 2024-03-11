// Dependencies
const fs = require("fs");
const fsPath = require("path");
// Files
const {joinRootPath} = require("../rootPath");


async function getFile(filePath, res)
{
    try
    {
        const {path} = joinRootPath(filePath);
        const name = filePath.substring(filePath.lastIndexOf("/"));
        
        if (fs.existsSync(path))
        {
            return {
                success: await res.download(path, name, err => {
                    const error =
                    {
                        message: "Server error.",
                        statusCode: 500,
                        err,
                    };
                    
                    return {"Error": error};
                }),
            };
        }
        else
        {
            const error =
            {
                code: "ENOENT",
                message: "File does not exist.",
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

async function postFile(filePath, fileData)
{
    try
    {
        if(!fileData)
        {
            const error = "File data not provided.";
            
            return {"Error": error};
        }
        else
        {
            const rejectedFiles = [];
            
            filePath = !filePath ? "rootDir" : filePath;
            
            if(!Array.isArray(fileData)) fileData = [fileData];
            
            fileData.map(async (file) => {
                const {name, data} = file;
                const fileExt = fsPath.extname(name);
                const {path} = joinRootPath(filePath, name, fileExt);
                
                if(fs.existsSync(path))
                {
                    rejectedFiles.push({
                        file: name,
                        error:
                        {
                            code: "EEXIST",
                            message: "File already exists.",
                            statusCode: 400,
                        },
                    });
                }
                else
                {
                    await fs.promises.writeFile(path, data).catch(foundError => {
                        if(foundError)
                        {
                            rejectedFiles.push({
                                file: name,
                                error:
                                {
                                    message: "Server error.",
                                    statusCode: 500,
                                },
                            });
                        };
                    });
                };
            });
            
            if(rejectedFiles.length)
            {
                return {"Error": rejectedFiles};
            }
            else
            {
                return {success: true};
            };
        };
    }
    catch(error)
    {
        console.error(error);
    };
};

async function putFile(filePath, fileName)
{
    try
    {
        if(!filePath || !fileName)
        {
            const error = "Dir name or path not provided.";
            
            return {"Error": error};
        }
        else
        {
            let foundError = null;
            let fileExt = fsPath.extname(fileName);
            
            const modPath = filePath.substring(0, filePath.lastIndexOf("/")) || "/";
            const oldPath = joinRootPath(filePath).path;
            
            if(!fileExt)
            {
                fileExt = fsPath.extname(oldPath);
            };
            
            const newPath = joinRootPath(modPath, fileName, fileExt).path;
            
            await fs.promises.rename(oldPath, newPath).catch(e => {foundError = true; return});
            
            if(!foundError)
            {
                return {success: true};
            }
            else
            {
                const error =
                {
                    code: "ENOENT",
                    message: "File does not exist.",
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

async function deleteFile(filePath)
{
    try
    {
        let foundError = null;
        const {path} = joinRootPath(filePath);
        
        await fs.promises.unlink(path, {recursive: true}).catch(e => {foundError = true; return});
        
        if(!foundError)
        {
            return {success: true};
        }
        else
        {
            const error =
            {
                code: "ENOENT",
                message: "File does not exist",
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




async function backup(path, time)
{
    try
    {
        
    }
    catch(error)
    {
        console.error(error);
    };
};

module.exports =
{
    getFile,
    postFile,
    putFile,
    deleteFile,
};