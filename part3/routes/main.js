'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

let updatedChain = ['Loading...'];
router.get('/', async (req, res) => {
	// initial load, can be refactored
	// populates blockchain data
	if (updatedChain[0] === 'Loading...') {
		updatedChain = blockchain.fetchBlockchain()
		// console.log('TRIGGERED')
		// console.log('BLOCK WITHIN', blockchain)
		// console.log('CHAIN WITHIN', updatedChain);
	}
	else if (updatedChain.length === 0 && blockchain.height === 0) {
		// console.log('TRIGGERED GENESIS CASE!')
		blockchain.checkGenesis();
	}
	// after genesis, updates chain data on refresh one time
	else if(blockchain.height >= 1 && blockchain.chain.length === 0){
		updatedChain = blockchain.fetchBlockchain()
		blockchain.chain = updatedChain
		// console.log('AFTER GENESIS', blockchain);
		// await console.log('POST GENESIS', blockchain);
		// await blockchain.fetchBlockchain([])
		// await console.log('POST FETCH', blockchain);
	}
	else if (updatedChain.length >= 1){
		// console.log('TRIGGERED NEW BLOCK CASE')
		blockchain.getBlockHeight(updatedChain.length)
	}
	console.log('chain prior to route', blockchain);
	console.log('updatedChain', updatedChain);
	blockchain.chain = updatedChain;
	/*
	if (updatedChain.length < 1) {
		console.log('CHAAIN LENGTH IN ROUTE', blockchain.chain.length)
		console.log('CHAIN HEIGHT IN ROTUE', blockchain.height)
		blockchain.checkGenesis()
	}*/
	 console.log('request: ', req.headers)
	// console.log('blockchain: ', blockchain)

	// handles cases where blockchain is not defined
  res.send(
    {
      healthy: true,
      blockchain
    });
});

module.exports = router;
