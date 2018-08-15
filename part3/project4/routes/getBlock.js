'use strict';

const router = require('express').Router();

let blockchain = require("../services/blockchain");

// the blockHeight route parameter is expted here, and passed back to the route
router.get('/:blockHeight', async (req, res) => {
    let chain = await blockchain.fetchBlockchain();

	let {headers, params} = req;

  // sets block height
  blockchain.setBlockHeight(chain.length)

  // sets the blockchain service data with data from leveldb
  blockchain.chain = chain;

  // checks block height, create genesis
  if (blockchain.height === 0) {
    console.log('Populating blockchain with genesis block...')
    blockchain.createGenesis();
  }

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
