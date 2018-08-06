'use strict';

const router = require('express').Router();
const { checkHeight, getLevelDBData, populateBlockchain, addDataToLevelDB } = require("../models/utils");
let blockchain = require("../services/blockchain");

let updatedChain = ['Loading...'];
router.get('/', async (req, res) => {
	if (updatedChain[0] === 'Loading...') {
		updatedChain = populateBlockchain(blockchain.chain);
		console.log('TRIGGERED')
		console.log('BLOCK WITHIN', blockchain)
		console.log('CHAIN WITHIN', updatedChain);
	}
	else if (updatedChain.length === 0) {
		console.log('TRIGGERED EMPTY CASE!')
		blockchain.checkGenesis()
	}
	
	console.log('updatedChain', updatedChain);
	console.log('Blockchain', blockchain)
	/*
	if (updatedChain.length < 1) {
		console.log('CHAAIN LENGTH IN ROUTE', blockchain.chain.length)
		console.log('CHAIN HEIGHT IN ROTUE', blockchain.height)
		blockchain.checkGenesis()
	}*/
	// console.log('request: ', req.headers)
	// console.log('blockchain: ', blockchain)
  res.status(200).json(
    {
      healthy: true,
      blockchain
    });
});

module.exports = router;
