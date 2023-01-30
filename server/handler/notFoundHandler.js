const environments = require("../helpers/environments")
const handler = {}

handler.notFoundHandler = (requestProperty, callback) => {
  callback(404, {
    error : environments.message.not_found
  })
}

module.exports = handler
