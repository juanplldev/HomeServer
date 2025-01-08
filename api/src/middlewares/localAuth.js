// Files
const api_response = require("../services/api_response");
const {getUser} = require("../controllers/userController");
const {signToken, readToken} = require("../services/jwt");
const {API_KEY, JWT_SECRET} = process.env;


async function authenticateUser(content)
{
    const token = await signToken(
        {
            id: content.id,
            username: content.username,
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
            const response = await getUser(userId);
            
            if(response.success)
            {
                const userData = {id, username, filesPath} = response.data.dataValues;
                
                req.userData = userData;
                
                return next();
            }
            else
            {
                const response = api_response.unauthorizedError("User not logged in.");
                return res.status(response.status).send(response);
            };
        }
        else
        {
            const response = api_response.invalidTokenError("Invalid token.");
            return res.status(response.status).send(response);
        };
    }
    else
    {
        const response = api_response.unauthorizedError("No authorization.");
        return res.status(response.status).send(response);
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
        const response = api_response.unauthorizedError("You must be the owner.");
        return res.status(response.status).send(response);
    };
};

async function isAuthorized(req, res, next)
{
    const apiKey = req.headers["x-api-key"];
    
    if(apiKey === API_KEY)
    {
        return next();
    }
    else
    {
        const response = api_response.forbiddenError("Invalid API key.");
        return res.status(response.status).send(response);
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
            
            if(foundUser.data?.dataValues?.isAdmin)
            {
                return next();
            }
            else
            {
                const response = api_response.unauthorizedError("You must be an administrator.");
                return res.status(response.status).send(response);
            };
        }
        else
        {
            const response = api_response.unauthorizedError("You must be an administrator.");
            return res.status(response.status).send(response);
        };
    }
    else
    {
        const response = api_response.unauthorizedError("You must be an administrator.");
        return res.status(response.status).send(response);
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