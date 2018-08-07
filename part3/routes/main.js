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
	blockchain.setBlockHeight(chain.length)
	blockchain.chain = chain;

	// checks block height, create genesis
	if (blockchain.height === 0) {
		blockchain.createGenesis();
	}
	console.log('blockchain: ', blockchain)
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
