const express = require("express");
const helmet = require("helmet");
const path = require("path");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");

const routes = require("./routes/v1");
const errorHandler = require("./middlewares/errorHandle.js");
const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

app.use(express.static(path.join(__dirname, "uploads")));

app.use("/v1", routes);

app.use(errorHandler);

module.exports = app;
