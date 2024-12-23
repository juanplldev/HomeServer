// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getUser, putUser, deleteUser} = require("../controllers/userController");
const {isAuthenticated, isAdmin, isOwner} = require("../middlewares/localAuth");

// Get user info
router.get("/user/:userId?", async (req, res) => {
    try
    {
        const {userId} = req.params;
        
        const userInfo = await getUser(userId);
        
        if(!userInfo?.error)
        {
            res.status(200).send(userInfo);
        }
        else
        {
            res.status(404).send(userInfo);
        };
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server error.");
    };
});

// Put user info
router.put("/user/:userId", isAuthenticated, isOwner, async (req, res) => {
    try
    {
        const {userId} = req.params;
        const content = {userName, password, filesPath, pathsToBackup} = req.body;
        
        if(content.userName && content.password)
        {
            const foundError = await putUser(userId, content);
            
            if(!foundError)
            {
                res.status(200).send("User updated successfully.");
            }
            else
            {
                res.status(404).send(foundError);
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
        res.status(500).send("Server error.");
    };
});

// Delete user
router.delete("/user/:userId", isAuthenticated, isAdmin, async (req, res) => {
    try
    {
        const {userId} = req.params;
        
        const foundError = await deleteUser(userId);
        
        if(!foundError)
        {
            res.status(200).send("User deleted successfully.");
        }
        else
        {
            res.status(404).send(foundError);
        };
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server error.");
    };
});


module.exports = router;