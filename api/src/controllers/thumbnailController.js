// Dependencies
const fs = require("node:fs");
// Files
const api_response = require("../services/api_response");
const {joinThumbnailPath} = require("../utils/joinPath");
const {getMimeType} = require("../services/mime-type");
const {generateImageThumbnail} = require("../services/sharp");
const {generateVideoThumbnail} = require("../services/ffmpeg");
const {generatePDFThumbnail} = require("../services/pdfjs-dist");


async function verifyThumbnailsDir(thumbnailsDir)
{
    if(fs.existsSync(thumbnailsDir)) return;
    
    return await fs.promises.mkdir(thumbnailsDir).catch(console.error);
};

async function getThumbnail(userId, filePath)
{
    const {thumbnailsDir, thumbnailPath} = await joinThumbnailPath(userId, filePath);
    
    await verifyThumbnailsDir(thumbnailsDir);
    
    if(fs.existsSync(thumbnailPath))
    {
        try
        {
            const thumb = await fs.promises.readFile(thumbnailPath);
            return api_response.success("Thumbnail read successfully.", thumb);
        }
        catch(error)
        {
            console.error(api_response.error("Error getting thumbnail: " + thumbnailPath, error));
            return api_response.error("Error getting thumbnail: " + thumbnailPath, error);
        };
    };
    
    return api_response.notFoundError("Error getting thumbnail: " + thumbnailPath);
};

async function postThumbnail({userId, filePath, fileName, inputPath})
{
    const {thumbnailsDir, thumbnailPath, thumbnailName} = await joinThumbnailPath(userId, filePath, fileName);
    
    await verifyThumbnailsDir(thumbnailsDir);
    
    const mimeType = getMimeType(inputPath);
    
    try
    {
        if(mimeType === "image")
        {
            await generateImageThumbnail(inputPath, thumbnailPath);
        }
        else if(mimeType === "video")
        {
            generateVideoThumbnail({inputPath, thumbnailsDir, thumbnailPath, thumbnailName});
        }
        else if(mimeType === "pdf")
        {
            await generatePDFThumbnail(inputPath, thumbnailPath);
        };
        
        return api_response.created("Thumbnail created successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error creating thumbnail: " + thumbnailPath, error));
        return api_response.error("Error creating thumbnail: " + thumbnailPath, error);
    };
};

async function putThumbnail({userId, filePath, fileName, inputPath, modPath})
{
    const oldThumbnailPath = (await joinThumbnailPath(userId, filePath))?.thumbnailPath;
    
    try
    {
        
        if(!fs.existsSync(oldThumbnailPath))
        {
            return await postThumbnail({userId, filePath: modPath, fileName, inputPath});
        };
        
        const {thumbnailsDir, thumbnailPath} = await joinThumbnailPath(userId, modPath, fileName);
        
        await verifyThumbnailsDir(thumbnailsDir);
        
        await fs.promises.rename(oldThumbnailPath, thumbnailPath);
        
        return api_response.success("Thumbnail updated successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error updating thumbnail: " + oldThumbnailPath, error));
        return api_response.error("Error updating thumbnail: " + oldThumbnailPath, error);
    };
};

async function deleteThumbnail({userId, filePath})
{
    const {thumbnailsDir, thumbnailPath} = await joinThumbnailPath(userId, filePath);
    
    try
    {
        await verifyThumbnailsDir(thumbnailsDir);
        
        await fs.promises.unlink(thumbnailPath, {recursive: true});
        
        return api_response.success("Thumbnail deleted successfully.");
    }
    catch(error)
    {
        console.error(api_response.error("Error deleting thumbnail: " + thumbnailPath, error));
        return api_response.error("Error deleting thumbnail: " + thumbnailPath, error);
    };
};


module.exports =
{
    getThumbnail,
    postThumbnail,
    putThumbnail,
    deleteThumbnail,
};