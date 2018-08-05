'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

router.get('/', (req, res) => {

	// sets blockchain height;
	blockchain.fetchBlockchain()
	blockchain.getBlockHeight(blockchain.chain.length)
	console.log('request: ', req.headers)
	console.log('blockchain: ', blockchain)
  res.status(200).json(
    {
      healthy: true,
      blockchain
    });
});

module.exports = router;
