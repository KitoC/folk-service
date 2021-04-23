import express, { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  //   TODO: add error logging service

  console.log("\n___ERROR CAUGHT___\n");
  console.log(err);
  console.log("\n___ERROR CAUGHT___\n");

  res.json({ errors: { message: err.message, code: err.code } });
};

export default errorHandler;
