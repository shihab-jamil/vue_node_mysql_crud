const environments = require("../helpers/environments");
const { hash } = require("../helpers/utilities");
const db = require("../lib/db-driver");
const handler = {}

handler.login = (requestProperty, callback) => {
  const acceptedMethod = ["POST"];
  if(acceptedMethod.includes(requestProperty.method)){
    handler[requestProperty.method](requestProperty, callback);
  }else{
    callback(405, {
      error : environments.messages.method_not_allowed
    })
  }
}

handler.POST = (requestProperty, callback) => {
  const payloadData = requestProperty.body;

  const email = typeof payloadData.email === "string"
  && payloadData.email.length > 3 ? payloadData.email : false;

  const password = typeof payloadData.password === "string"
  && payloadData.password.length > 2 ? payloadData.password : false;

  if(email && password){
    payloadData.password = hash(payloadData.password)
    db.login(payloadData, callback)
  }else{
    callback(400, {
      error : environments.messages.bad_request
    })
  }
}

module.exports = handler
