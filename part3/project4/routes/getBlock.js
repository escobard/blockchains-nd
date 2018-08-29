'use strict';

const router = require('express').Router(),
initChain = require('../middlewares/initChain')

// the blockHeight route parameter is expted here, and passed back to the route
router.get('/:blockHeight', initChain,  async (req, res) => {
  let { params: { blockHeight } } = req;
	let block = blockchain.getBlock('height',blockHeight);
  // blockchain.validateBlock(blockHeight);
	// console.log('request: ', headers)
	// console.log('request parameters: ', params)
	console.log("block: ", block);


	// if block does not exist, return different response
	if (!block) {
		res.send(
    {
      healthy: true,
      blockHeightParams: blockHeight,
      block: 'Block does not exist - check the /getBlockHeight to check current chain height'
    });
	}

  res.send(
    {
      blockHeightParams: `Height: ${blockHeight}`,
      block,
    });
});

module.exports = router;
