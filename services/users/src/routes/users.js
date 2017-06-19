const express = require('express');
const localAuth = require('../auth/local');
const authHelpers = require('../auth/_helpers');

const router = express.Router();

// router.post('/register', (req, res) => {
//   return authHelpers.createUser(req, res)
//   .then((user) => { return localAuth.encodeToken(user[0]); })
//   .then((token) => {
//     res.status(200).json({
//       status: 'success',
//       token,
//     });
//   })
//   .catch(() => {
//     res.status(500).json({
//       status: 'error',
//     });
//   });
// });

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  authHelpers.getUser(username)
  .then((user) => {
    user.comparePassword(password)
    .then((match) => {
      if (!match) {
        throw new Error('Incorrect password');
      }
      return user;
    })
    .then((user) => { 
      return localAuth.makeToken(user); 
    })
    .then((token) => {
      res.status(200).json({
        token
      });
    })
  })
  .catch((err) => {
    res.status(500).json({
      message: err,
    });
  });
});

router.get('/user', authHelpers.ensureAuthenticated, (req, res) => {
  res.status(200).json({
    user: {
      givenName: req.user.givenName,
      familyName: req.user.familyName,
      id: req.user.id
    }
  });
});

module.exports = router;
