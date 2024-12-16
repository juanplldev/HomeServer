// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const {isAuthorized} = require("./src/middlewares/localAuth.js");
// Files
const {db} = require("./src/database/db.js");
const routes = require("./src/routes/index.js");
const {HOST="localhost", PORT=3000} = process.env;


const server = express();

// Middlewares
server.use(morgan("dev"));
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(fileUpload());

// Routes
server.use("/", isAuthorized, routes);

// Server starter
server.listen(PORT, HOST, () => {
  console.log(`Server is running on [${HOST}:${PORT}]`);
  db.sync({force: false})
  .then(console.log("Tables done"))
  // .catch(error => console.error(error));
});