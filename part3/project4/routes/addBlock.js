"use strict";

const router = require("express").Router(),
initChain = require('../middlewares/initChain')

// the blockHeight route parameter is expted here, and passed back to the route
router.get("/:blockData", initChain, async (req, res) => {
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