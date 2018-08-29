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
    blockchain.addBlock(body);
    let chain = await blockchain.fetchBlockchain();
    // sets the blockchain service data with data from leveldb
    blockchain.chain = chain;
    let newBlock = blockchain.getBlock(blockchain.height);
    // logs the blockchain
    delete global.address;
    delete global.authenticated;
    delete global.signature;
    delete global.authWindow;

    console.log("Destroyed all global variables");

    res.send({
      healthy: true,
      responseData: `added new block with the following data: ${body}`,
      newBlock,
      blockchain
    });
  }
);

module.exports = router;