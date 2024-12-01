// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getDir, postDir, putDir, deleteDir} = require("../controllers/dirMethods");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");


// Get directory
router.get("/:userId/dir/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const dirInfo = await getDir(userId, path);
        
        if(!dirInfo.Error)
        {
            res.status(200).send(dirInfo);
        }
        else
        {
            res.status(404).send(dirInfo.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Post directory
router.post("/:userId/dir/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const newDir = await postDir(userId, path);
        
        if(!newDir.Error)
        {
            res.status(200).send(newDir);
        }
        else
        {
            res.status(404).send(newDir.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Put directory
router.put("/:userId/dir/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        const {name} = req.body;
        
        const updatedDir = await putDir(userId, path, name);
        
        if(!updatedDir.Error)
        {
            res.status(200).send(updatedDir);
        }
        else
        {
            res.status(404).send(updatedDir.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Delete directory
router.delete("/:userId/dir/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const deletedDir = await deleteDir(userId, path);
        
        if(!deletedDir.Error)
        {
            res.status(200).send("Directory deleted successfully.");
        }
        else
        {
            res.status(404).send(deletedDir.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});


module.exports = router;