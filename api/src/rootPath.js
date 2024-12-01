// Dependencies
require("dotenv").config();
const path = require("path");
// Files
const {getUser} = require("./controllers/userMethods");


async function getUserRootPath(id)
{
    const {dataValues} = await getUser(id);
    return dataValues.filesPath;
}

async function joinRootPath(userId, dir, dirName="", fileExt="")
{
    const rootPath = await getUserRootPath(userId);
    
    if(!rootPath)
    {
        console.error("Storage path not defined.", "Set files path on User database.");
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


module.exports = 
{
    joinRootPath,
};