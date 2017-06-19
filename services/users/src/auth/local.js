const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
const issuer = "epekteino";
//const xsrfToken = "d9b9714c-7ac0-42e0-8696-2dae95dbc33e";

function makeToken(user) {
  const playload = {
    sub: user.id,
  };
  const options = {
    expiresIn: "15m", 
    jwtid: uuid(),
    issuer
//    xsrfToken
  };
  return jwt.sign(playload, process.env.TOKEN_SECRET, options);
}

function verifyToken(token, callback) {
  const options = {
    issuer: issuer
  };
  if (jwt.verify(token, process.env.TOKEN_SECRET, options)) {
    const payload = jwt.decode(token);
    callback(null, payload);
  }
  else {
    callback({err: "invalid JWT", message: "log in"}, null);
  }
}

module.exports = {
  makeToken,
  verifyToken,
};
