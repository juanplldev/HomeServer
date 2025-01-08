// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const api_response = require("../services/api_response");
const {postUser} = require("../controllers/userController");
const {isAdmin} = require("../middlewares/localAuth");


router.post("/register", isAdmin, async (req, res) => {
    const {username, password, filesPath} = req.body;
    
    try
    {
        if(username && password && filesPath)
        {
            const response = await postUser({username, password, filesPath});
            return res.status(response.status).send(response);
        }
        else
        {
            const response = api_response.unauthorizedError("Username and password required.");
            return res.status(response.status).send(response);
        };
    }
    catch(error)
    {
        const res_err = api_response.internalServerError(error);
        return res.status(res_err.status).send(res_err);
    };
});


module.exports = router;