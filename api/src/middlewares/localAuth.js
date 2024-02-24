// Files
const {User} = require("../db");
const {getModelById} = require("../controllers/getDbMethods");
const {signToken, readToken} = require("../services/jwt");
const {API_KEY, JWT_SECRET} = process.env;


async function authenticateUser(content)
{
    const token = await signToken(
        {
            id: content.id,
            userName: content.userName,
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
            const foundUser = await getModelById(User, userId);
            
            if(!foundUser.Error)
            {
                const {id, userName} = foundUser.dataValues;
                const userData = {id, userName};
                
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

module.exports =
{
    authenticateUser,
    isAuthenticated,
    isAuthorized,
};