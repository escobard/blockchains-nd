"use strict";

const router = require("express").Router();

let blockchain = require("../services/blockchain"),
  initChain = require("../middlewares/initChain"),
  checkValidation = require("../middlewares/checkValidation"),
  checkBlockData = require("../middlewares/checkBlockData");

// the blockHeight route parameter is expted here, and passed back to the route
router.post(
  "/",
  initChain,
  checkValidation,
  checkBlockData,
  async (req, res) => {
    let { headers, params, body } = req;
    // adds block data based on route parameters
    console.log('Adding block:', body)
    blockchain.addBlock(body);
    setTimeout(async function() {
      // re-populating object with new data
      console.log('Populating blockchain...')
      let chain = await blockchain.fetchBlockchain();
      // sets the blockchain service data with data from leveldb
      blockchain.chain = chain;
      let newBlock = blockchain.getBlock("height", blockchain.height, true);

      res.send({
        newBlock,
      });
    }, 500);
  }
);

// the blockHeight route parameter is expted here, and passed back to the route
router.get("/:blockHeight", initChain, async (req, res) => {
  let { params: { blockHeight } } = req;
  let block = blockchain.getBlock("height", blockHeight);
  // blockchain.validateBlock(blockHeight);
  // console.log('request: ', headers)
  // console.log('request parameters: ', params)
  console.log("block: ", block);

  // if block does not exist, return different response
  if (!block) {
    res.send({
      healthy: true,
      blockHeightParams: blockHeight,
      block:
        "Block does not exist - check the /getBlockHeight to check current chain height"
    });
  }

  res.send({
    blockHeightParams: `Height: ${blockHeight}`,
    block
  });
});

module.exports = router;