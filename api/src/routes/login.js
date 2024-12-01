// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {authenticateUser, isAdmin} = require("../middlewares/localAuth");
const {comparePassword} = require("../services/bcrypt");
const {getModelByParam} = require("../controllers/dbMethods");


router.post("/login", async (req, res, next) => {
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
                    
                    res.status(200).send({msg: "User logged in.", content});
                }
                else
                {
                    res.status(404).send("Invalid username or password.");
                };
            }
            else
            {
                res.status(404).send("Invalid username or password.");
            };
        }
        else
        {
            res.status(404).send("Username and password required.");
        };
    }
    catch(error)
    {
        console.error(error);
    };
});


module.exports = router;