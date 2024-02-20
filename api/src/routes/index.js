// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const register = require("./register");
const login = require("./login");


// Routers settings
router.use(register);
router.use(login);


module.exports = router;