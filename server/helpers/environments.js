// dependencies

const environments = {};

environments.common = {
  dbCredentials : {
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "node_todo",
    insecureAuth : true
  },
  secretKey : "asdk&&(SDAKSNd",
  messages : {
    not_found : "Sorry! Your requested url was not found",
    method_not_allowed : "Sorry requested method not allowed",
    bad_request : "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
    internal_server_error : "The server has encountered a situation it does not know how to handle.",
    data_not_found : "Sorry your data was not found",
  }
}

environments.dev = {
  ...environments.common,
  port : 8000
}

environments.prod = {
  ...environments.common,
  port: 5000
}

const generatedModule = environments[process.env.NODE_ENV]

module.exports = generatedModule
