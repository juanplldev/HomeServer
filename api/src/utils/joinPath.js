// Dependencies
const path = require("node:path");
// Files
const {getUser} = require("../controllers/userController");


async function getUserRootPath(id)
{
    const response = await getUser(id);
    return response.data?.dataValues?.filesPath;
}

async function joinRootPath(userId, dir, dirName="", fileExt="")
{
    const rootPath = await getUserRootPath(userId);
    
    if(!rootPath)
    {
        console.error("User root files path not defined.", "Set files path on User database.", userId);
        process.exit(1);
    };
    
    if(!dir)
    {
        return {path: rootPath};
    }
    else if(dir === "rootDir")
    {
        return {
            path: path.join(rootPath, path.basename(dirName, path.extname(dirName))) + fileExt,
            clientPath: path.join(dir, path.basename(dirName, path.extname(dirName))) + fileExt,
        };
    }
    else
    {
        return {
            path: path.join(rootPath, dir, path.basename(dirName, path.extname(dirName))) + fileExt,
            clientPath: path.join(dir, path.basename(dirName, path.extname(dirName))) + fileExt,
        };
    };
};

async function joinThumbnailPath(userId, filePath, fileName)
{
    const rootPath = await getUserRootPath(userId);
    
    let thumbnailName = filePath.split("/").join("_");
    
    if(fileName) thumbnailName = thumbnailName + "_" + path.parse(fileName).name + ".webp";
    else thumbnailName = path.parse(thumbnailName).name + ".webp";
    
    if(thumbnailName.startsWith("rootDir_")) thumbnailName = thumbnailName.replace("rootDir_", "");
    
    const thumbnailsDir = path.join(rootPath, ".thumbnails");
    const thumbnailPath = path.join(thumbnailsDir, thumbnailName);
    
    return {thumbnailsDir, thumbnailPath, thumbnailName};
};


module.exports = 
{
    joinRootPath,
    joinThumbnailPath,
};