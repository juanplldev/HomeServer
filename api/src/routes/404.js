// Dependencies
const {Router} = require("express");
const router = Router();
// Files


router.use((req, res, next) => {
    res.status(404).send("Not found.");
});


module.exports = router;