'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

// the blockHeight route parameter is expted here, and passed back to the route
router.get('/:blockHeight', (req, res) => {
	let {headers, params} = req;
	let block = blockchain.getBlock(params.blockHeight)
	console.log('request: ', headers)
	console.log('request parameters: ', params)
	console.log("getBlock(0) returns genesis block", block);
  res.status(200).json(
    {
      healthy: true,
      blockHeightParams: params.blockHeight,
      block
    });
});

module.exports = router;
