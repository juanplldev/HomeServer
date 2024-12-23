// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {getThumbnail} = require("../controllers/thumbnailController");
const {isAuthenticated, isOwner} = require("../middlewares/localAuth");
const {processPath} = require("../middlewares/processPath");


// Get file
router.get("/:userId/thumbnail/:path*?", isAuthenticated, isOwner, processPath, async (req, res) => {
    try
    {
        const {userId, path} = req.params;
        
        const thumbnailInfo = await getThumbnail(userId, path);
        
        if(thumbnailInfo)
        {
            res.status(200).send(thumbnailInfo);
        }
        else
        {
            res.status(404).send(thumbnailInfo);
        };
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server error.");
    };
});


module.exports = router;