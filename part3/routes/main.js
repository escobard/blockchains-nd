'use strict';

const router = require('express').Router();
const { checkHeight, getLevelDBData, populateBlockchain, addDataToLevelDB } = require("../models/utils");
let blockchain = require("../services/blockchain");

let updatedChain = ['Loading...'];
router.get('/', async (req, res) => {
	// initial load, can be refactored
	if (updatedChain[0] === 'Loading...') {
		updatedChain = populateBlockchain(blockchain.chain);
		console.log('TRIGGERED')
		console.log('BLOCK WITHIN', blockchain)
		console.log('CHAIN WITHIN', updatedChain);
		  res.status(200).json(
    {
      healthy: true,
      blockchain
    });
	}
	else if (updatedChain.length === 0) {
		console.log('TRIGGERED EMPTY CASE!')
		blockchain.checkGenesis();
		  res.status(200).json(
    {
      healthy: true,
      blockchain
    });
	}
	else if (updatedChain.length > 0){
		console.log('TRIGGERED NEW BLOCK CASE')
		blockchain.getBlockHeight(updatedChain.length)
		  res.status(200).json(
    {
      healthy: true,
      blockchain
    });
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

	// handles cases where blockchain is not defined
  res.status(200).json(
    {
      healthy: true,
      blockchain
    });
});

module.exports = router;
