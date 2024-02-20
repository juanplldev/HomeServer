// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {authenticateUser} = require("../middlewares/localAuth");
const {comparePassword} = require("../services/bcrypt");
const {getModelByParam} = require("../controllers/getDbMethods");


// Post user credentials to login
router.post("/login", async (req, res, next) => {
    const {userName, password} = req.body;
    
    try
    {
        if(userName && password)
        {
            const foundUser = await getModelByParam(User, "userName", userName, "one");
            
            if(!foundUser.Error)
            {
                const foundPassword = foundUser.dataValues.password;
                const checkPassword = await comparePassword(password, foundPassword);
                
                if(checkPassword)
                {
                    const token = await authenticateUser(foundUser.dataValues);
                    
                    res.status(200).send({msg: "User logged in.", content: token});
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