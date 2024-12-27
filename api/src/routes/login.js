// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const api_response = require("../services/api_response");
const {User} = require("../database/db");
const {authenticateUser} = require("../middlewares/localAuth");
const {comparePassword} = require("../services/bcrypt");
const {getModelByParam} = require("../database/dbMethods");


router.post("/login", async (req, res) => {
    const {userName, password} = req.body;
    
    try
    {
        if(userName && password)
        {
            const splittedUserName = userName.trim().split(" ");
            let modifiedUserName = userName;
            
            if(splittedUserName.length === 1)
            {
                modifiedUserName = userName.charAt(0).toUpperCase() + String(userName).slice(1);
            }
            else
            {
                modifiedUserName = splittedUserName[0].at(0).toUpperCase() + splittedUserName[0].slice(1) + " " + splittedUserName[1].at(0).toUpperCase() + splittedUserName[1].slice(1);
            };
            
            const foundUser = await getModelByParam(User, "username", modifiedUserName, "one");
            
            if(!foundUser.Error)
            {
                const foundPassword = foundUser.dataValues.password;
                const checkPassword = await comparePassword(password, foundPassword);
                
                if(checkPassword)
                {
                    const token = await authenticateUser(foundUser.dataValues);
                    const content =
                    {
                        userId: foundUser.dataValues.id,
                        isAdmin: foundUser.dataValues.isAdmin,
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