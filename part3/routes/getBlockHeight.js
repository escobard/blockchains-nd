'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

router.get('/', (req, res) => {
	
	let blockHeight = blockchain.getBlockHeight();

	console.log('request: ', req.headers)
	console.log('blockHeight: ', blockHeight)
  res.status(200).json(
    {
      healthy: true,
      blockHeight
    });
});

module.exports = router;
