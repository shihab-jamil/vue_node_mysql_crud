// dependencies
const url = require("url");
const routes = require("../routes/routes");
const { StringDecoder } = require("string_decoder");
const { parseJSON } = require("../helpers/utilities")

const handler = {}

handler.handleReqRes = (req, res) => {
  const requestProperty = handler.mapRequestProperty(req);
  const choosenHandler = routes.generateHandler(requestProperty.trimmedPath)
  const decoder = new StringDecoder("utf-8");
  let data = "";

  req.on("data", buffer => {
    data += decoder.write(buffer);
  })
  req.on("end", () => {
    data += decoder.end();
    requestProperty.body = parseJSON(data);

    choosenHandler(requestProperty, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type" , "Application/json")
      res.setHeader('Access-Control-Allow-Method', '*');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.writeHead(statusCode);
      res.end(payloadString);
    })
  })


};

handler.mapRequestProperty = (request) => {
  const parsedUrl = url.parse(request.url, true);
  const path = parsedUrl.path;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = request.method.toUpperCase();
  const queryStringObj = parsedUrl.query;
  const headerObj = request.headers
  const body = {}

  return {
    parsedUrl,
    path,
    trimmedPath,
    method,
    queryStringObj,
    headerObj,
    body
  }
}

module.exports = handler
