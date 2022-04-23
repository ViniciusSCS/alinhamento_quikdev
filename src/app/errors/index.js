const sendNotFoundError = require("./NotFound");
const sendAuthenticationError = require("./NotAuthenticated");
const sendBadRequest = require("./BadRequest");
const sendInternalServerError = require("./InternalServerError");

module.exports = {
  sendNotFoundError,
  sendAuthenticationError,
  sendBadRequest,
  sendInternalServerError,
};
