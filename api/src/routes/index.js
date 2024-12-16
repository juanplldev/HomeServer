// Dependencies
const {Router} = require("express");
const router = Router();
// Files
const user = require("./user");
const register = require("./register");
const login = require("./login");
const directories = require("./directories");
const files = require("./files");
const thumbnails = require("./thumbnails");
const restart = require("./restart");
const notFound = require("./404");


// Routers settings
router.use(user);
router.use(register);
router.use(login);
router.use(directories);
router.use(files);
router.use(thumbnails);
router.use(restart);
router.use(notFound);


module.exports = router;