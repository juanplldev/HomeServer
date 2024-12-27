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
const {IP, PORT} = process.env;


const server = express();

// Middlewares
server.disable("x-powered-by");
server.use(morgan("dev"));
server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(fileUpload());

// Routes
server.use("/", isAuthorized, routes);

// Server starter
server.listen(PORT, IP, () => {
  if(!PORT || !IP) {
    console.error("Provide PORT and IP in .env file");
    process.exit(1);
  };
  console.log(`Server is running on http://${IP}:${PORT}`);
  db.sync({force: false})
  .then(console.log("Database ready"))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
});