let level = require("level");
let chainDB = "./chaindata";
let db = level(chainDB);

const SHA256 = require("crypto-js/sha256");

// need to split up all levelDB functionality into a utils file
function addLevelDBData(key, value) {
  db.put(key, value, function(err) {
    if (err) return console.log("Block " + key + " submission failed", err);
  });
}

function getLevelDBData(key){
  db.get(key, function(err, value) {
    if (err) return console.log('Not found!', err);
    console.log('Value = ' + value);
    return value;
  })
}

const addDataToLevelDB = (value, height) => {
  let i = 0;
  db
    .createReadStream()
    .on("data", function(data) {
      i++;
    })
    .on("error", function(err) {
      return console.log("Unable to read data stream!", err);
    })
    .on("close", function() {
      console.log("Block #" + i);
      if (height) {
        height = i;
      }
      addLevelDBData(i, value);
    });
};

const populateBlockchain = array => {
  db
    .createReadStream()
    .on("data", function(data) {
      let { value } = data;
      console.log("DATA", value);
      array.push(JSON.parse(value));
    })
    .on("error", function(err) {
      return console.log("Unable to read data stream!", err);
    })
    .on("close", function() {
      console.log(array);
    });
  return array;
};

class Block {
  constructor(data) {
    (this.hash = ""),
      (this.height = 0),
      (this.body = data),
      (this.time = 0),
      (this.previousblockhash = "");
  }
}
let dat = populateBlockchain([]);
class Blockchain {
  constructor(data) {
    this.chain = data;
    this.height = this.chain.length;
    if (this.height === 0) {
      this.gen = new Block("Genesis block - First block in the chain");

      this.addBlock(this.gen);
    }
    this.height = this.height === 0 ? 1 : this.chain.length;
  }

  addBlock(newBlock) {
    let { chain, height } = this;
    console.log("HEIGHT", height);
    newBlock.height = height;

    newBlock.time = new Date()
      .getTime()
      .toString()
      .slice(0, -3);

    if (chain.length === 1 || height >= 2) {
      console.log("TRIGGERED");
      // sets the property of the new block as the previous block's hash
      newBlock.previousblockhash =
        // searches the block prior to this one via the array's index
        // then grabs the hash from the .hash property of the previous block
        chain[height - 1].hash;
    }

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    let jsonBlock = JSON.stringify(newBlock);
    console.log("JSON BLOCK", jsonBlock);
    addDataToLevelDB(jsonBlock);
  }

  getBlockHeight() {
    return this.chain.length;
  }

  getBlock(blockHeight) {
    return this.chain[blockHeight]
  }

  validateBlock(blockHeight) {
    let block = this.getBlock(blockHeight);

    let blockHash = block.hash;

    block.hash = "";

    let validBlockHash = SHA256(JSON.stringify(block)).toString();

    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log(
        "Block #" +
          blockHeight +
          " invalid hash:\n" +
          blockHash +
          "<>" +
          validBlockHash
      );
      return false;
    }
  }

  validateChain() {
    let errorLog = [];
    for (var i = 0; i < this.chain.length - 1; i++) {
      if (!this.validateBlock(i)) errorLog.push(i);

      let blockHash = this.chain[i].hash;
      let previousHash = this.chain[i + 1].previousBlockHash;
      if (blockHash !== previousHash) {
        errorLog.push(i);
      }
    }
    if (errorLog.length > 0) {
      console.log("Block errors = " + errorLog.length);
      console.log("Blocks: " + errorLog);
    } else {
      console.log("No errors detected");
    }
  }
}

let blockchain;
// runs constructor functions
setTimeout(function() {
  blockchain = new Blockchain(dat);
}, 1000);

setTimeout(function() {
    console.log("blockchain", blockchain);

  console.log("getBlockHeight returns height of chain", blockchain.getBlockHeight());
}, 2000);

setTimeout(function() {
  if (blockchain.chain.length >= 1) {
    blockchain.addBlock(new Block("test data"));
    console.log("getBlock(0) returns genesis block", blockchain.getBlock(0));
  }
  if (blockchain.chain.length >= 2) {
    console.log("validates second block", blockchain.validateBlock(1));
    console.log("validates chain", blockchain.validateChain());
  }
}, 3000);