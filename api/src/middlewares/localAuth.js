// Files
const {getUser} = require("../controllers/userMethods");
const {signToken, readToken} = require("../services/jwt");
const {API_KEY, JWT_SECRET} = process.env;


async function authenticateUser(content)
{
    const token = await signToken(
        {
            id: content.id,
            userName: content.userName,
            isAdmin: content.isAdmin,
            avatar: content.avatar,
            filesPath: content.filesPath,
        },
        JWT_SECRET,
        "1000d",
    );
    
    return token;
};

async function isAuthenticated(req, res, next)
{
    const {authorization} = req.headers;
    
    if(authorization)
    {
        const decodedToken = await readToken(authorization, JWT_SECRET);
        const userId = decodedToken !== undefined ? decodedToken.id : null;
        
        if(userId)
        {
            const foundUser = await getUser(userId);
            
            if(!foundUser.Error)
            {
                const userData = {id, userName, filesPath} = foundUser.dataValues;
                
                req.userData = userData;
                
                return next();
            }
            else
            {
                res.status(404).send("User not logged in.");
            };
        }
        else
        {
            res.status(404).send("Invalid token.");
        };
    }
    else
    {
        res.status(404).send("No authorization.");
    };
};

async function isOwner(req, res, next)
{
    const {userId} = req.params;
    
    if(userId === req.userData.id)
    {
        return next();
    }
    else
    {
        res.status(404).send("You must be the owner.");
    };
};

async function isAuthorized(req, res, next)
{
    const {apiKey} = req.query;
    const validApiKey = apiKey === API_KEY ? true : false;
    
    if(validApiKey)
    {
        return next();
    }
    else
    {
        res.status(404).send("No authorization. Invalid API key.");
    };
};

async function isAdmin(req, res, next)
{
    const {authorization} = req.headers;
    
    if(authorization)
    {
        const decodedToken = await readToken(authorization, JWT_SECRET);
        const userId = decodedToken !== undefined ? decodedToken.id : null;
        
        if(userId)
        {
            const foundUser = await getUser(userId);
            
            if(foundUser.dataValues?.isAdmin)
            {
                return next();
            }
            else
            {
                res.status(404).send("You must be an administrator to create new accounts.");
            };
        }
        else
        {
            res.status(404).send("You must be an administrator to create new accounts.");
        };
    }
    else
    {
        res.status(404).send("You must be an administrator to create new accounts.");
    };
};


module.exports =
{
    authenticateUser,
    isAuthenticated,
    isOwner,
    isAuthorized,
    isAdmin,
};