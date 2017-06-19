const localAuth = require('./local');
var models = require('../models');

// // function createUser(req) {
// //   return new models.User({login: req.body.username, password: req.body.password}).
// //   .insert({
// //     username: req.body.username,
// //     password: hash,
// //   })
// //   .returning('*');
// // }

function getUser(username) {
  return models.User.findOne({ username: username });
}

/* eslint-disable consistent-return */
function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(401).json({
      status: 'Please log in',
    });
  }
  // decode the token
  const header = req.headers.authorization.split(' ');
  const token = header[1];
  localAuth.verify(token, (err, payload) => {
    if (err) {
      return res.status(400).json({
        status: 'Token has expired',
      });
    }
    return models.User.getUser(payload.sub)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(() => {
      return res.status(500).json({
        status: 'error',
      });
    });
  });
}
/* eslint-enable consistent-return */

module.exports = {
  // createUser,
  getUser,
  ensureAuthenticated,
};
