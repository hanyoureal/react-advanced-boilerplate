const express = require('express');
const utils = require('../utils/common');
const { logIn, logOut } = require('../mock-data/session/sessions.mock.js')();

const router = express.Router();

router.route('/')
  .post((req, res) => {
    const loginData = req.body;
    const session = logIn({ ...loginData });
    if (session) {
      res.status(200).json({
        session,
      });
    } else {
      res.status(404).json(utils.createErrorObject('Invalid username or password'));
    }
  });

router.route('/')
  .delete((req, res) => {
    const userToken = req.headers.token;
    logOut(userToken);
    res.status(200).json();
  });

module.exports = router;
