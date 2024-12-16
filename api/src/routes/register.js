// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {postUser} = require("../controllers/userController");
const {isAdmin} = require("../middlewares/localAuth");


router.post("/register", isAdmin, async (req, res, next) => {
    const {userName, password, filesPath} = req.body;
    
    try
    {
        if(userName && password && filesPath)
        {
            const newUser = await postUser({userName, password, filesPath});
            
            if(newUser)
            {
                res.status(200).send("User created successfully.");
            }
            else
            {
                res.status(404).send("Username not available.");
            };
        }
        else
        {
            res.status(404).send("Username, password and files path required.");
        };
    }
    catch(error)
    {
        console.error(error);
    };
});


module.exports = router;