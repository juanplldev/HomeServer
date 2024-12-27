// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getFile, postFile, putFile, deleteFile} = require("../controllers/fileController");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");
const api_response = require("../services/api_response");


// Get file
router.get("/:userId/file/:path*?", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        
        const response = await getFile(userId, path);
        
        if(response.success)
        {
            const {path, name} = response.data;
            
            return res.status(response.status).download(path, name);
        }
        else
        {
            return res.status(response.status).send(response);
        };
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});

// Post file
router.post("/:userId/file/:path*?", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        const file = req.files?.file;
        
        const response = await postFile(userId, path, file);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});

// Put file
router.put("/:userId/file/:path*", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        const {name} = req.body;
        
        const response = await putFile(userId, path, name);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});

// Delete file
router.delete("/:userId/file/:path*", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        
        const response = await deleteFile(userId, path);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});


module.exports = router;