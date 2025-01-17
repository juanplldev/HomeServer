// Dependencies
const fs = require("node:fs");
const fsPath = require("node:path");
// Files
const api_response = require("../services/api_response");
const {joinRootPath} = require("../utils/joinPath");
const {postThumbnail, putThumbnail, deleteThumbnail} = require("./thumbnailController");


async function getFile(userId, filePath)
{
    try
    {
        const {path} = await joinRootPath(userId, filePath);
        const name = fsPath.basename(path);
        
        if(fs.existsSync(path))
        {
            const fileInfo =
            {
                path,
                name,
            };
            
            return api_response.success("File read successfully.", fileInfo);
        };
        
        return api_response.notFoundError(`Error getting file: ${filePath}`);
    }
    catch(error)
    {
        console.error(api_response.internalServerError(`Error getting file: ${filePath}`, error));
        return api_response.internalServerError(`Error getting file: ${filePath}`, error);
    };
};

async function postFile(userId, filePath, file)
{
    if(file)
    {
        filePath = filePath || "rootDir";
        
        const {name, data} = file;
        const fileExt = fsPath.extname(name);
        
        const {path} = await joinRootPath(userId, filePath, name, fileExt);
        
        if(fs.existsSync(path))
        {
            const thumbnailValues =
            {
                userId,
                filePath,
                fileName: name,
                inputPath: path,
            };
            
            await postThumbnail(thumbnailValues);
            
            return api_response.error("File already exists.");
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
                
                return api_response.created("File uploaded successfully.");
            }
            catch(error)
            {
                console.error(api_response.internalServerError(`Error uploading file: ${  name}`, error));
                return api_response.internalServerError(`Error uploading file: ${  name}`, error);
            };
        };
    };
    
    return api_response.error("Provide file.");
};

async function putFile(userId, filePath, fileName)
{
    if(filePath && fileName)
    {
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
            
            return api_response.success("File updated successfully.");
        }
        catch(error)
        {
            console.error(api_response.internalServerError(`Error updating file: ${  fileName}`, error));
            return api_response.internalServerError(`Error updating file: ${  fileName}`, error);
        };
    };
    
    return api_response.error("Provide file path and file name.");
};

async function deleteFile(userId, filePath)
{
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
        
        return api_response.success("File deleted successfully.");
    }
    catch(error)
    {
        console.error(api_response.internalServerError(`Error deleting file: ${filePath}`, error));
        return api_response.internalServerError(`Error deleting file: ${filePath}`, error);
    };
};


module.exports =
{
    getFile,
    postFile,
    putFile,
    deleteFile,
};