// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const user = require("./user");
const register = require("./register");
const login = require("./login");
const directories = require("./directories");
const files = require("./files");


// Routers settings
router.use(user);
router.use(register);
router.use(login);
router.use(directories);
router.use(files);


module.exports = router;