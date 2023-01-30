// dependencies
const server = require("./lib/server");
const db = require("./lib/db-driver")
const app = {};

app.init = () => {
  server.init()
  db.connectDB()
}

app.init();

module.exports = app;
