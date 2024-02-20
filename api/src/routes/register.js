// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {hashPassword} = require("../services/bcrypt");
const {getModelByParam} = require("../controllers/getDbMethods");
const {postModel} = require("../controllers/postDbMethods");
const {ADMIN_PASSWORD} = process.env;


router.post("/register", async (req, res, next) => {
    const {userName, password} = req.body;
    
    try
    {
        if(userName && password)
        {
            const foundUser = await getModelByParam(User, "userName", userName, "one");
            
            if(foundUser.Error)
            {
                const hashedPassword = await hashPassword(password);
                const content =
                {
                    userName: userName && userName,
                    password: hashedPassword,
                };
                
                await postModel(User, content);
                
                res.status(200).send("User created successfully.");
            }
            else
            {
                res.status(404).send("Username not available.");
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