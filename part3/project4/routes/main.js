'use strict';

const router = require('express').Router(),
initChain = require('../middlewares/initChain')

router.get('/', initChain, async (req, res) => {

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
