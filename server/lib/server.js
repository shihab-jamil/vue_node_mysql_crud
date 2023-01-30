// dependencies
const http = require("http");
const { handleReqRes } = require("../helpers/handleReqRes");
const environments = require("../helpers/environments")

const server = {};

server.init = () => {
  let serverInstance = http.createServer(handleReqRes);
  serverInstance.listen(environments.port, ()=> {
    console.log(`Listening to port ${environments.port}`);
  })
}

server.handleReqRes = handleReqRes;

module.exports = server;

