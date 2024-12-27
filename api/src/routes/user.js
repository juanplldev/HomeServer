// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const api_response = require("../services/api_response");
const {getUser, putUser, deleteUser} = require("../controllers/userController");
const {isAuthenticated, isAdmin, isOwner} = require("../middlewares/localAuth");

// Get user info
router.get("/user/:userId?", async (req, res) => {
    try
    {
        const {userId} = req.params;
        
        const response = await getUser(userId);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
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
            const response = await putUser(userId, content);
            return res.status(response.status).send(response);
        }
        else
        {
            const response = api_response.unauthorizedError("Provide username and password.");
            return res.status(response.status).send(response);
        };
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});

// Delete user
router.delete("/user/:userId", isAuthenticated, isAdmin, async (req, res) => {
    try
    {
        const {userId} = req.params;
        
        const response = await deleteUser(userId);
        return res.status(response.status).send(response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});


module.exports = router;