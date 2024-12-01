// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getFile, postFile, putFile, deleteFile} = require("../controllers/fileMethods");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");

// Get file
router.get("/:userId/file/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const fileInfo = await getFile(userId, path, res);
        
        if(!fileInfo.Error)
        {
            return fileInfo.success;
        }
        else
        {
            res.status(404).send(fileInfo.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Post file
router.post("/:userId/file/:path*?", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        const file = req.files?.file;
        
        const newFile = await postFile(userId, path, file);
        
        if(!newFile.Error)
        {
            res.status(200).send("File uploaded successfully.");
        }
        else
        {
            res.status(404).send(newFile.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Put file
router.put("/:userId/file/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        const {name} = req.body;
        
        const updatedFile = await putFile(userId, path, name);
        
        if(!updatedFile.Error)
        {
            res.status(200).send(updatedFile);
        }
        else
        {
            res.status(404).send(updatedFile.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});

// Delete file
router.delete("/:userId/file/:path*", isAuthenticated, isOwner, processPath, async (req, res, next) => {
    try
    {
        const {userId, path} = req.params;
        
        const deletedFile = await deleteFile(userId, path);
        
        if(!deletedFile.Error)
        {
            res.status(200).send("File deleted successfully.");
        }
        else
        {
            res.status(404).send(deletedFile.Error);
        };
    }
    catch(error)
    {
        console.error(error);
    };
});


module.exports = router;