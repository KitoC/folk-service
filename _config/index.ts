import db from "./db";

require("dotenv").config();

export default {
  port: process.env.PORT,
  appName: "user-service",
  db,
};
