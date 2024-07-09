// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const upload = require("../../server");
const {getFile, postFile, putFile, deleteFile} = require("../controllers/fileMethods");
const {isAuthenticated} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");

// Get file
router.get("/file/:path*?", isAuthenticated, processPath, async (req, res, next) => {
    try
    {
        const {path} = req.params;
        const fileInfo = await getFile(path, res);
        
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
router.post("/file/:path*?", isAuthenticated, processPath, upload.array("files"), async (req, res, next) => {
    try
    {
        const {path} = req.params;
        const {file} = req.files;
        console.log(file, path);
        const newFile = {};
        // const newFile = await postFile(path, file);
        
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
router.put("/file/:path*", isAuthenticated, processPath, async (req, res, next) => {
    try
    {
        const {path} = req.params;
        const {name} = req.body;
        
        const updatedFile = await putFile(path, name);
        
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
router.delete("/file/:path*", isAuthenticated, processPath, async (req, res, next) => {
    try
    {
        const {path} = req.params;
        
        const deletedFile = await deleteFile(path);
        
        if(!deletedFile.Error)
        {
            res.status(200).send(deletedFile);
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