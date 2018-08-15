'use strict';

const router = require('express').Router(),
initChain = require('../middlewares/initChain')

// the blockHeight route parameter is expted here, and passed back to the route
router.get('/:blockHeight', initChain,  async (req, res) => {
  
	let block = blockchain.getBlock(params.blockHeight);
  blockchain.validateBlock(params.blockHeight);
	// console.log('request: ', headers)
	// console.log('request parameters: ', params)
	console.log("block: ", block);


	// if block does not exist, return different response
	if (!block) {
		res.send(
    {
      healthy: true,
      blockHeightParams: params.blockHeight,
      block: 'Block does not exist - check the /getBlockHeight to check current chain height'
    });
	}

  res.send(
    {
      blockHeightParams: params.blockHeight,
      block,
      blockchain
    });
});

module.exports = router;
