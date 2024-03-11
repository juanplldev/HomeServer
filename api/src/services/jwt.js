// Dependencies
const jwt = require("jsonwebtoken");


async function signToken(data, secret, expiryTime)
{
    if(data && secret && expiryTime)
    {
        try
        {
            return jwt.sign(
                data,
                secret,
                {
                    expiresIn: expiryTime,
                },
            );
        }
        catch(error)
        {
            return {"Error": error};
        };
    }
    else
    {
        const error = "Provide data, secret and expiry time date.";
        
        return {msg: "Failed to create the token.", error: error};
    };
};

async function verifyToken(token, secret)
{
    if(token)
    {
        try
        {
            return jwt.verify(token, secret);
        }
        catch(error)
        {
            return {"Error": error};
        };
    }
    else
    {
        const error = "Token is required.";
        
        return {msg: "Failed to verify the token.", error: error};
    };
};

async function readToken(authorization, secret)
{
    if(authorization)
    {
        try
        {
            const token = authorization.split(" ").pop();
            const decodedToken = await verifyToken(token, secret);
            
            return decodedToken;
        }
        catch(error)
        {
            return {"Error": error};
        };
    }
    else
    {
        const error = "Missing authorization.";
        
        return {msg: "Failed to read the token.", error: error};
    };
};


module.exports =
{
    signToken,
    verifyToken,
    readToken,
};