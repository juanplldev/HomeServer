// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getDir, postDir, putDir, deleteDir} = require("../controllers/dirMethods");
const {isAuthenticated} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");


// Get directory
router.get("/dir/:path*?", isAuthenticated, processPath, async (req, res, next) => {
    try
    {
        const {path} = req.params;
        const dirInfo = await getDir(path);
        
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
router.post("/dir/:path*?", isAuthenticated, processPath, async (req, res, next) => {
    try
    {
        const {path} = req.params;
        const {name} = req.body;
        
        const newDir = await postDir(path, name);
        
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
router.put("/dir/:path*", isAuthenticated, processPath, async (req, res, next) => {
    try
    {
        const {path} = req.params;
        const {name} = req.body;
        
        const updatedDir = await putDir(path, name);
        
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
router.delete("/dir/:path*", isAuthenticated, processPath, async (req, res, next) => {
    try
    {
        const {path} = req.params;
        
        const deletedDir = await deleteDir(path);
        
        if(!deletedDir.Error)
        {
            res.status(200).send(deletedDir);
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