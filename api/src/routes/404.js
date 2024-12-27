// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const api_response = require("../services/api_response");


router.use((req, res) => {
    const response = api_response.notFoundError("Not found.");
    return res.status(response.status).send(response);
});


module.exports = router;