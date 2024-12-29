// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const {isAuthorized} = require("./src/middlewares/localAuth.js");
// Files
const sequelize = require("./src/database/sequelize.js");
const routes = require("./src/routes/index.js");
const {IP="localhost", PORT=3000} = process.env;


const app = express();

// Middlewares
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());

// Routes
app.use("/", isAuthorized, routes);

// Server starter
app.listen(PORT, IP, () => {
  console.log(`Server is running on http://${IP}:${PORT}`);
  sequelize.sync({force: false})
  .then(console.log("Database ready"))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
});