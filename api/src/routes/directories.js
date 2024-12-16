// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getDir, postDir, putDir, deleteDir} = require("../controllers/dirController");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");


// Get directory
router.get("/:userId/dir/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const dirInfo = await getDir(userId, path);
        
        if(!dirInfo?.error)
        {
            res.status(200).send(dirInfo);
        }
        else
        {
            res.status(404).send(dirInfo);
        };
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server error.");
    };
});

// Post directory
router.post("/:userId/dir/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const foundError = await postDir(userId, path);
        
        if(!foundError)
        {
            res.status(200).send("Directory created successfully.");
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

// Put directory
router.put("/:userId/dir/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        const {name} = req.body;
        
        const foundError = await putDir(userId, path, name);
        
        if(!foundError)
        {
            res.status(200).send("Directory updated successfully.");
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

// Delete directory
router.delete("/:userId/dir/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const foundError = await deleteDir(userId, path);
        
        if(!foundError)
        {
            res.status(200).send("Directory deleted successfully.");
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