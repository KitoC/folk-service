"use strict";
exports.__esModule = true;
var db_1 = require("./db");
require("dotenv").config();
exports["default"] = {
    port: process.env.PORT,
    appName: "user-service",
    db: db_1["default"]
};
