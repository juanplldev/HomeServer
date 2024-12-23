// Dependencies
const {exec} = require("child_process");
const {Router} = require("express");
const router = Router();
// Files
const {isAdmin} = require("../middlewares/localAuth");


router.post("/restart", isAdmin, async (req, res, next) => {
    try
    {
        let response = "";
        
        exec("pm2 restart server", (error, stdout, stderr) => {
            response = error || stderr || stdout;
            
            if(error)
            {
                console.error("Error on server restart.", error);
                return;
            };
            if(stderr)
            {
                console.error("stderr:", stderr);
                return;
            };
            
            console.log("stdout:", stdout);
        });
        
        res.send(response);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).send("Server error.");
    };
});


module.exports = router;