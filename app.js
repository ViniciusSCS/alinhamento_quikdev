require("dotenv").config();
require("./src/database/mysql");
require("./src/helpers/prototype");

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const mongoose = require('./src/database/mongoose')

// mongoose()

const peopleRouter = require("./routes/people");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/people", peopleRouter);

module.exports = app;
