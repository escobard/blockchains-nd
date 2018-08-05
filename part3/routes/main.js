'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

router.get('/', (req, res) => {

	console.log('request: ', req.headers)
	console.log('blockchain: ', block)
  res.status(200).json(
    {
      healthy: true,
      blockchain
    });
});

module.exports = router;
