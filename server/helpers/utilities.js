const crypto = require("crypto");
const environments = require("../helpers/environments")

const utilities = {};

utilities.parseJSON = (string) => {
  let output = {};
  try{
    output = JSON.parse(string)
  }catch {
    output = {}
  }
  return output
}

utilities.hash = (str) => {
  if(typeof (str) === 'string' && str.length > 0){
    return crypto.createHmac('sha256', environments.secretKey )
      .update(str)
      .digest('hex')
  }else{
    return false;
  }
}

module.exports = utilities
