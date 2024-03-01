// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const {User} = require("../db");
const {getModel} = require("../controllers/getDbMethods");


// Get users info
router.get("/users", async (req, res, next) => {
    try
    {
            const foundUsers = await getModel(User);
            
            if(!foundUsers.Error)
            {
                res.status(200).send({msg: "Success", content: foundUsers});
            }
            else
            {
                res.status(404).send({msg: "Failure", content: foundUsers.Error});
            };
    }
    catch(error)
    {
        console.error(error);
    };
});


module.exports = router;