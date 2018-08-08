'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

router.get('/', async (req, res) => {
	new Promise((resolve, reject) => {
		let chain = blockchain.fetchBlockchain();
		 setTimeout(function(){
		    resolve(chain);
		 }, 250);
	}).then((chain) =>{

	// sets block height
	blockchain.setBlockHeight(chain.length)

	// sets the blockchain service data with data from leveldb
	blockchain.chain = chain;

	// checks block height, create genesis
	if (blockchain.height === 0) {
		console.log('Populating blockchain with genesis block...')
		blockchain.createGenesis();
	}
	if (blockchain.height >= 2) {
		blockchain.validateChain()
	}
	// logs the blockchain
	console.log('blockchain: ', blockchain);
	
  res.send(
    {
      healthy: true,
      blockchain
    });
 	}).catch(err =>{
 		console.log(err)
 	})
});

module.exports = router;
