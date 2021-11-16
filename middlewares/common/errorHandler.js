const { responseGenerator } = require("../../utils");

// 404 not found handler
function notFoundHandler(req, res, next) {
  res.status(404).json(responseGenerator(null, 404, "Not found"));
}

// default error handler
function errorHandler(err, req, res, next) {
  if (err.message) {
    res.status(500).json(responseGenerator(null, 500, err.message));
  } else {
    res.status(500).json(responseGenerator(null, 500, "There was an error"));
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
