// Dependencies
const fs = require("fs");
const fsPath = require("path");
// Files
const {joinRootPath} = require("../utils/joinPath");
const {postThumbnail, putThumbnail, deleteThumbnail} = require("./thumbnailController");


async function getFile(userId, filePath)
{
    let foundError = null;
    let fileInfo = {};
    
    try
    {
        const {path} = await joinRootPath(userId, filePath);
        const name = fsPath.basename(path);
        
        if(fs.existsSync(path))
        {
            fileInfo =
            {
                path,
                name,
            };
        };
    }
    catch(error)
    {
        foundError =
        {
            file: filePath,
            msg: "Error getting file.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError || fileInfo;
};

async function postFile(userId, filePath, fileData)
{
    if(fileData)
    {
        const rejectedFiles = [];
        
        filePath = filePath || "rootDir";
        
        if(!Array.isArray(fileData)) fileData = [fileData];
        
        for (const file of fileData)
        {
            const {name, data} = file;
            const fileExt = fsPath.extname(name);
            
            const {path} = await joinRootPath(userId, filePath, name, fileExt);
            
            if(fs.existsSync(path))
            {
                rejectedFiles.push({
                    file: name,
                    msg: "File name already exists.",
                });
                const thumbnailValues =
                {
                    userId,
                    filePath,
                    fileName: name,
                    inputPath: path,
                };
                
                await postThumbnail(thumbnailValues);
            }
            else
            {
                try
                {
                    const writeStream = fs.createWriteStream(path);
                    
                    writeStream.write(data);
                    writeStream.end();
                    
                    writeStream.on("finish", async () => {
                        const thumbnailValues =
                        {
                            userId,
                            filePath,
                            fileName: name,
                            inputPath: path,
                        };
                        
                        await postThumbnail(thumbnailValues);
                        
                        writeStream.close();
                    });
                }
                catch(error)
                {
                    console.error("Error writing file:", name, error);
                    
                    rejectedFiles.push({
                        file: name,
                        msg: "Write fail.",
                        error,
                    });
                };
            };
        };
        
        return rejectedFiles;
    };
};

async function putFile(userId, filePath, fileName)
{
    if(filePath && fileName)
    {
        let foundError = null;
        
        try
        {
            const modPath = filePath.substring(0, filePath.lastIndexOf("/")) || "/";
            const oldPath = (await joinRootPath(userId, filePath))?.path;
            
            let fileExt = fsPath.extname(fileName);
            
            if(!fileExt)
            {
                fileExt = fsPath.extname(oldPath);
            };
            
            const newPath = (await joinRootPath(userId, modPath, fileName, fileExt))?.path;
            
            await fs.promises.rename(oldPath, newPath);
            
            const thumbnailValues =
            {
                userId,
                filePath,
                fileName,
                modPath,
                inputPath: newPath,
            };
            
            await putThumbnail(thumbnailValues);
        }
        catch(error)
        {
            foundError =
            {
                file: fileName,
                msg: "Error updating file.",
                error,
            };
            
            console.error(foundError);
        };
        
        return foundError;
    };
};

async function deleteFile(userId, filePath)
{
    let foundError = null;
    
    try
    {
        const {path} = await joinRootPath(userId, filePath);
        
        await fs.promises.unlink(path, {recursive: true});
        
        const thumbnailValues =
        {
            userId,
            filePath,
        };
        
        await deleteThumbnail(thumbnailValues);
    }
    catch(error)
    {
        foundError =
        {
            file: filePath,
            msg: "Error deleting file.",
            error,
        };
        
        console.error(foundError);
    };
    
    return foundError;
};


module.exports =
{
    getFile,
    postFile,
    putFile,
    deleteFile,
};