const express = require('express');
const utils = require('../utils/common');
const mockOrders = require('../mock-data/orders/orders.mock.js')();
const { checkLogin } = require('../mock-data/session/sessions.mock.js')();

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const userToken = req.headers.token;
    checkLogin(
      userToken,
      res,
      () => {
        const orders = mockOrders.items;
        if (orders) {
          res.status(200).json({
            members: orders,
            total: orders.length,
            count: 0,
            start: 0,
          });
        } else {
          res.status(404).json(utils.createErrorObject('Error getting all Controls'));
        }
      });
  });

module.exports = router;
