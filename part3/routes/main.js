'use strict';

const router = require('express').Router();
const { checkHeight, getLevelDBData, populateBlockchain, addDataToLevelDB } = require("../models/utils");
let blockchain = require("../services/blockchain");

let updatedChain = ['Loading...'];
router.get('/', async (req, res) => {
	if (updatedChain[0] === 'Loading...') {
		console.log('TRIGGERED')
		updatedChain = populateBlockchain(blockchain.chain);
		blockchain.checkGenesis()
		console.log('BLOCK WITHIN', blockchain)
		console.log('CHAIN WITHIN', updatedChain);
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
