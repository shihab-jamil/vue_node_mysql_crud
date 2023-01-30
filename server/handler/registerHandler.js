const environments = require("../helpers/environments")
const {hash} = require("../helpers/utilities")
const db = require("../lib/db-driver")

const handler = {}

handler.register = (requestProperty, callback) => {
  const acceptedMethod = ["POST"];
  if(acceptedMethod.includes(requestProperty.method)){
    handler[requestProperty.method](requestProperty, callback);
  }else{
    callback(405, {
      error : environments.message.method_not_allowed
    })
  }
}

handler.POST = (requestProperty, callback) => {
  const payloadData = requestProperty.body;
  const firstName  = typeof payloadData.firstName === "string"
    && payloadData.firstName.length > 3 ? payloadData.firstName : false;

  const lastName = typeof payloadData.lastName === "string"
    && payloadData.lastName.length > 3 ? payloadData.lastName : false;

  const userName = typeof payloadData.userName === "string"
    && payloadData.userName.length > 3 ? payloadData.userName : false;

  const email = typeof payloadData.email === "string"
    && payloadData.email.length > 3 ? payloadData.email : false;

  const password = typeof payloadData.password === "string"
    && payloadData.password.length > 6 ? payloadData.password : false;

    if(firstName && lastName && userName && email && password){
    payloadData.password = hash(payloadData.password)
    db.register(payloadData, callback)
  }else{
    callback(400, {
      error : environments.messages.bad_request
    })
  }
}

module.exports = handler
