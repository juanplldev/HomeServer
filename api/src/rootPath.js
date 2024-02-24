// Dependencies
require("dotenv").config();
const path = require("path");


const rootPath = process.env.ROOT_PATH;

if(!rootPath)
{
    console.error("Storage path not defined.", "Set value for ROOR_PATH environment variable.");
    process.exit(1);
};

function joinRootPath(dir, dirName="")
{
    if(!dir)
    {
        return rootPath;
    }
    else
    {
        return path.join(rootPath, dir, dirName);
    };
};

module.exports = 
{
    rootPath,
    joinRootPath,
};