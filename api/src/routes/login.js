// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const User = require("../database/models/User");
const api_response = require("../services/api_response");
const {authenticateUser} = require("../middlewares/localAuth");
const {comparePassword} = require("../services/bcrypt");
const {getModelByParam} = require("../database/dbMethods");


router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    
    try
    {
        if(username && password)
        {
            const splittedUsername = username.trim().split(" ");
            let modifiedUsername = username;
            
            if(splittedUsername.length === 1)
            {
                modifiedUsername = username.charAt(0).toUpperCase() + String(username).slice(1);
            }
            else
            {
                modifiedUsername = splittedUsername[0].at(0).toUpperCase() + splittedUsername[0].slice(1) + " " + splittedUsername[1].at(0).toUpperCase() + splittedUsername[1].slice(1);
            };
            
            const foundUser = await getModelByParam(User, "username", modifiedUsername, "one");
            
            if(!foundUser.error)
            {
                const foundPassword = foundUser.model.dataValues.password;
                const checkPassword = await comparePassword(password, foundPassword);
                
                if(checkPassword)
                {
                    const token = await authenticateUser(foundUser.model.dataValues);
                    const content =
                    {
                        userId: foundUser.model.dataValues.id,
                        isAdmin: foundUser.model.dataValues.isAdmin,
                        token,
                    };
                    
                    const response = api_response.success("User logged in.", content);
                    return res.status(response.status).send(response);
                };
                
                const response = api_response.unauthorizedError("Invalid username or password.");
                return res.status(response.status).send(response);
            }
            else
            {
                const response = api_response.unauthorizedError("Invalid username or password.");
                return res.status(response.status).send(response);
            };
        }
        else
        {
            const response = api_response.unauthorizedError("Username and password required.");
            return res.status(response.status).send(response);
        };
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});


module.exports = router;