'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

router.get('/', (req, res) => {
	
	let blockHeight = blockchain.getBlockHeight(blockchain.chain.length);

	console.log('request: ', req.headers)
	console.log('blockHeight: ', blockHeight)
  res.send({
      healthy: true,
      blockHeight,
      blockchain
    })
});

module.exports = router;
