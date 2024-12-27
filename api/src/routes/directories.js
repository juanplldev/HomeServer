// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getDir, postDir, putDir, deleteDir} = require("../controllers/dirController");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");
const api_response = require("../services/api_response");


// Get directory
router.get("/:userId/dir/:path*?", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        
        const response = await getDir(userId, path);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});

// Post directory
router.post("/:userId/dir/:path*?", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        
        const response = await postDir(userId, path);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});

// Put directory
router.put("/:userId/dir/:path*", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        const {name} = req.body;
        
        const response = await putDir(userId, path, name);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});

// Delete directory
router.delete("/:userId/dir/:path*", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        
        const response = await deleteDir(userId, path);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});


module.exports = router;