const mysql = require("mysql")
const environments = require("../helpers/environments")
const db = {};

db.con = mysql.createConnection(environments.dbCredentials)

db.connectDB = () => {
  db.con.connect(error => {
    if(error){
      throw error
    }else{
      console.log("Database connected")
    }
  })
}

db.register = (data, callback) => {
  const query = `INSERT INTO users (first_name, last_name, user_name, email, password) VALUES('${data.firstName}', '${data.lastName}', '${data.userName}', '${data.email}', '${data.password}')`;
  db.con.query(query, (error, result) => {
    if(error){
      callback(500, {
        error : environments.messages.internal_server_error
      })
    }else{
      callback(200, result)
    }
  })
}

db.login = (data, callback) => {
  const query = `SELECT *  FROM users WHERE email='${data.email}' AND password='${data.password}'`;
  db.con.query(query, (error, result) => {
    if(error){
      callback(500, {
        error : environments.messages.internal_server_error
      })
    }else{
      if(result.length > 0){
        result = result[0];
        delete result.password
        callback(200, result)
      }else{
        callback(404, {
          error : environments.messages.data_not_found
        })
      }

    }
  })
}

module.exports = db
