// dependencies
const { register } = require("../handler/registerHandler")
const { login } = require("../handler/loginHandler")
const { notFoundHandler } = require("../handler/notFoundHandler")

const routes = {};

routes.notFoundHandler = notFoundHandler

routes.handleRoute = {
  register : register,
  login: login
}

routes.generateHandler = (trimmedPath) => {
  return routes.handleRoute[trimmedPath] ?? routes.notFoundHandler
}

module.exports = routes
