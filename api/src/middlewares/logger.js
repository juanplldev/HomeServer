// Files
const {Log} = require("../db");
const {postModel} = require("../controllers/postDbMethods");


async function logger(res, userId)
{
    const error = typeof res.error === "string" ? res.error : JSON.stringify(res.error);
    
    const logData =
    {
        text: "",
        error: error,
    };
    
    const newLog = await postModel(Log, logData);
    
    newLog.addUser(userId);
};


module.exports =
{
    logger,
};