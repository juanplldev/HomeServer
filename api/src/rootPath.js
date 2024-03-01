// Dependencies
require("dotenv").config();
const path = require("path");


const rootPath = process.env.ROOT_PATH;

if(!rootPath)
{
    console.error("Storage path not defined.", "Set value for ROOR_PATH environment variable.");
    process.exit(1);
};

function joinRootPath(dir, dirName="", fileExt="")
{
    if(!dir)
    {
        return {path: rootPath};
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
    rootPath,
    joinRootPath,
};