// Dependencies
const {exec} = require("child_process");
const {Router} = require("express");
const router = Router();
// Files
const api_response = require("../services/api_response");
const {isAdmin} = require("../middlewares/localAuth");


router.post("/restart", isAdmin, async (req, res) => {
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
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});


module.exports = router;