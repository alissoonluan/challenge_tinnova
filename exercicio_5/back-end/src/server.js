const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
require("./database");

const app = express();

app.use(cors());

app.options("*", cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(routes);

app.listen(3333);
