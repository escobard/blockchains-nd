'use strict';

const router = require('express').Router();

router.get('/', async (req, res) => {
	let chain = await blockchain.fetchBlockchain();

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
      blockchain
    });
});

module.exports = router;
