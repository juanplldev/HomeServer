// Dependencies
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// Files
const {db} = require("./src/db");
const routes = require("./src/routes/index.js");
const {HOST, CLIENT_URL} = process.env;


// Middlewares
server.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));
server.use(bodyParser.json({limit: "50mb"}));
server.use(morgan("dev"));
// server.use(cookieParser(SESSION_SECRET, {
//   decode: true,
// }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routes
server.use("/", routes);

// Server starter
server.listen(HOST, () => {
  console.log(`Listening on port ${HOST}`);
  db.sync({force: false})
  .then(console.log("Tables done"))
  // .catch(error => console.error(error));
});