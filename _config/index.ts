import db from "./db";

require("dotenv").config();

export = {
  port: process.env.PORT,
  appName: "user-service",
  db,
};
