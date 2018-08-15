"use strict";

const router = require("express").Router();

let blockchain = require("../services/blockchain");

// the blockHeight route parameter is expted here, and passed back to the route
router.get("/:blockData", async (req, res) => {
    let chain = await blockchain.fetchBlockchain();
      let { headers, params } = req;
      
      // sets block height
      blockchain.setBlockHeight(chain.length);

      // sets the blockchain service data with data from leveldb
      blockchain.chain = chain;

      // checks block height, create genesis
      if (blockchain.height === 0) {
        console.log("Populating blockchain with genesis block...");
        blockchain.createGenesis();
      }

      // adds block data based on route parameters
      blockchain.addBlock(params.blockData);

      // logs the blockchain
      console.log("blockchain: ", blockchain);

      res.send({
        newBLock: `added new block with the following data: ${
          params.blockData
        }`,
        blockchain
      });
});

module.exports = router;