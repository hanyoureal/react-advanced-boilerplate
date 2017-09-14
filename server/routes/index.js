const express = require('express');
// const filterResponse = require('../utils/filters').filterResponse;
const getRandomInt = require('../utils/common').getRandomInt;

const router = express.Router();

// Retrieves the mock route according to the resource name,
// eg: '/templates', '/deployments'
function handleRequest(req, res) {
  // Simulate server response delay
  const DELAY = getRandomInt(0, 1000);
  setTimeout(() => {
    try {
      const route = require(`./${req.params.resourceName}`); // eslint-disable-line
      return route(req, res);
    } catch (e) {
      console.error(e); // eslint-disable-line
      res.sendStatus(404);
    }
  }, DELAY);
}

// The resourceName points to the file name of the router
router.use('/:resourceName', handleRequest);

module.exports = router;
