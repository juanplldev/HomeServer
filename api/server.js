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
const {PORT = 3000, CLIENT_URL} = process.env;


const server = express();

// Middlewares
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json({limit: "50mb"}));
server.use(morgan("dev"));
server.use(fileUpload());
server.use(cors());
// server.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", CLIENT_URL);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// Routes
server.use("/", isAuthorized, routes);

// Server starter
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  db.sync({force: false})
  .then(console.log("Tables done"))
  // .catch(error => console.error(error));
});