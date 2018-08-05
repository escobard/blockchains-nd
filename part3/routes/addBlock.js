'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

// the blockHeight route parameter is expted here, and passed back to the route
router.get('/:blockData', (req, res) => {
	let {headers, params} = req,
	blockData = blockchain.addBlock(params.blockData),
	blockHeight = blockChain.getBlockHeight();
	block = blockChain.getBlock(blockHeight);
	console.log('request: ', headers)
	console.log('request parameters: ', params)
	console.log("block: ", block);


	// if block does not exist, return different response
	if (blockHeight === 0) {
		res.status(200).json(
    {
      healthy: true,
      blockHeightParams: params.blockHeight,
      response: `no blocks exist, refresh the page as a genesis block has been created`,
    });
	}

  res.status(200).json(
    {
      healthy: true,
      blockHeightParams: params.blockHeight,
      response: `added new block with the following data: ${params.blockData}`,
      block
    });
});

module.exports = router;
