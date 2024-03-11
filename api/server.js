// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const {isAuthorized} = require("./src/middlewares/localAuth.js");
// Files
const {db} = require("./src/db");
const routes = require("./src/routes/index.js");
const {PORT = 3000} = process.env;


const server = express();

// Middlewares
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json({limit: "50mb"}));
server.use(morgan("dev"));
server.use(fileUpload());
server.use(cors());

// Routes
server.use("/", isAuthorized, routes);

// Server starter
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  db.sync({force: false})
  .then(console.log("Tables done"))
  // .catch(error => console.error(error));
});