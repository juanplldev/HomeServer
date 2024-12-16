// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getFile, postFile, putFile, deleteFile} = require("../controllers/fileController");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");


// Get file
router.get("/:userId/file/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const fileInfo = await getFile(userId, path);
        
        if(!fileInfo?.error)
        {
            res.status(200).download(fileInfo.path, fileInfo.name);
        }
        else
        {
            res.status(404).send(fileInfo);
        };
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server error.");
    };
});

// Post file
router.post("/:userId/file/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        const file = req.files?.file;
        
        const rejectedFiles = await postFile(userId, path, file);
        
        if(!rejectedFiles?.length)
        {
            res.status(200).send("File uploaded successfully.");
        }
        else
        {
            res.status(404).send(rejectedFiles);
        };
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server error.");
    };
});

// Put file
router.put("/:userId/file/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        const {name} = req.body;
        
        const foundError = await putFile(userId, path, name);
        
        if(!foundError)
        {
            res.status(200).send("File updated successfully.");
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

// Delete file
router.delete("/:userId/file/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const foundError = await deleteFile(userId, path);
        
        if(!foundError)
        {
            res.status(200).send("File deleted successfully.");
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