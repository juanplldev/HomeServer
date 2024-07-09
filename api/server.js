// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const fileUpload = require("express-fileupload");
const multer = require("multer");
const cors = require("cors");
const {isAuthorized} = require("./src/middlewares/localAuth.js");
// Files
const {db} = require("./src/db");
const routes = require("./src/routes/index.js");
const {HOST="localhost", PORT=3000} = process.env;


const server = express();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Middlewares
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json({limit: "50mb"}));
server.use(morgan("dev"));
// server.use(fileUpload());
server.use(cors());

// Routes
server.use("/", isAuthorized, routes);

// Server starter
server.listen(PORT, HOST, () => {
  console.log(`Server is running on [${HOST}:${PORT}]`);
  db.sync({force: false})
  .then(console.log("Tables done"))
  // .catch(error => console.error(error));
});


module.exports = upload;