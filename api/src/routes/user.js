// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getUser, putUser, deleteUser} = require("../controllers/userMethods");
const {isAuthenticated, isAdmin, isOwner} = require("../middlewares/localAuth");

// Get user info
router.get("/user/:userId?", isAuthenticated, async (req, res, next) => {
    try
    {
        const {userId} = req.params;
        
        const foundUser = await getUser(userId);
        
        if(!foundUser.Error)
        {
            res.status(200).send(foundUser);
        }
        else
        {
            res.status(404).send(foundUser.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Put user info
router.put("/user/:userId", isAuthenticated, isOwner, async (req, res, next) => {
    try
    {
        const {userId} = req.params;
        const content = {userName, password, filesPath, pathsToBackup} = req.body;
        
        if(content.userName && content.password)
        {
            const updatedUser = await putUser(userId, content);
            
            if(updatedUser)
            {
                res.status(200).send(updatedUser);
            }
            else
            {
                res.status(404).send("Username already in use.");
            };
        }
        else
        {
            res.status(404).send("Provide username and password.");
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Delete user
router.delete("/user/:userId", isAuthenticated, isAdmin, async (req, res, next) => {
    try
    {
        const {userId} = req.params;
        
        const deletedUser = await deleteUser(userId);
        
        if(!deletedUser.Error)
        {
            res.status(200).send("User deleted successfully.");
        }
        else
        {
            res.status(404).send(deletedUser.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});


module.exports = router;