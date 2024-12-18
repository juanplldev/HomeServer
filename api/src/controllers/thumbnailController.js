// Dependencies
const fs = require("node:fs");
// Files
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
    let foundError = null;
    let thumbnailInfo = {};
    
    const {thumbnailsDir, thumbnailPath} = await joinThumbnailPath(userId, filePath);
    
    await verifyThumbnailsDir(thumbnailsDir);
    
    try
    {
        if(fs.existsSync(thumbnailPath)) return await fs.promises.readFile(thumbnailPath);
    }
    catch(error)
    {
        foundError =
        {
            file: thumbnailPath,
            msg: "Error getting thumbnail.",
            code: error.code,
        };
        
        console.error(foundError);
    };
    
    return foundError || thumbnailInfo;
};

async function postThumbnail({userId, filePath, fileName, inputPath})
{
    const {thumbnailsDir, thumbnailPath, thumbnailName} = await joinThumbnailPath(userId, filePath, fileName);
    
    await verifyThumbnailsDir(thumbnailsDir);
    
    const mimeType = getMimeType(inputPath);
    
    let foundError = null;
    
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
    }
    catch(error)
    {
        foundError =
        {
            file: thumbnailPath,
            msg: "Error generating thumbnail.",
            code: error.code,
        };
        
        console.error(foundError);
    };
};

async function putThumbnail({userId, filePath, fileName, inputPath, modPath})
{
    const oldThumbnailPath = (await joinThumbnailPath(userId, filePath))?.thumbnailPath;
    
    let foundError = null;
    
    try
    {
        
        if(!fs.existsSync(oldThumbnailPath))
        {
            return await postThumbnail({userId, filePath: modPath, fileName, inputPath});
        };
        
        const {thumbnailsDir, thumbnailPath} = await joinThumbnailPath(userId, modPath, fileName);
        
        await verifyThumbnailsDir(thumbnailsDir);
        
        await fs.promises.rename(oldThumbnailPath, thumbnailPath);
    }
    catch(error)
    {
        foundError =
        {
            file: oldThumbnailPath,
            msg: "Error udpating thumbnail.",
            code: error.code,
        };
        
        console.error(foundError);
    };
};

async function deleteThumbnail({userId, filePath})
{
    const {thumbnailsDir, thumbnailPath} = await joinThumbnailPath(userId, filePath);
    
    let foundError = null;
    
    try
    {
        await verifyThumbnailsDir(thumbnailsDir);
        
        await fs.promises.unlink(thumbnailPath, {recursive: true});
    }
    catch(error)
    {
        foundError =
        {
            file: thumbnailPath,
            msg: "Error deleting thumbnail.",
            code: error.code,
        };
        
        console.error(foundError);
    };
};


module.exports =
{
    getThumbnail,
    postThumbnail,
    putThumbnail,
    deleteThumbnail,
};