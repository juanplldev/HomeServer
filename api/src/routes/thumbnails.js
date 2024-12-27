// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const api_response = require("../services/api_response");
const {getThumbnail} = require("../controllers/thumbnailController");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");


// Get file
router.get("/:userId/thumbnail/:path*?", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        
        const response = await getThumbnail(userId, path);
        return res.status(response.status).send(response.data ?? response);
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});


module.exports = router;