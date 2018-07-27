// navigate to this folder and type the `node` command, then copy and pase
// the code below into the terminal node.js runtime
// need to remove all commentary by going:
// control find = //, select all
// shift + end, selects all lines

// each class and constant must be entered one at a time in the console to work

// loads the SHA256 library to encrypt - SO COOL
const SHA256 = require('crypto-js/sha256');
const {addDataToLevelDB, populateBlockchain, getLevelDBData} = require('./levelSandbox')
// this holds the block, anything passed into the class argument
// is fed into the data property within the constructor
class Block{
	
	// just like react, contains initial declarations for the class
	// we pass the data argument to the constructed to update our block information
	constructor(data){
   
   // sets these as global variables to the class, much like state
   // contains the header  block properties
   this.hash = "",
   this.height = 0,
   // passes the transaction hashes to the this.body property.
   this.body = data,
   this.time = 0,
   this.previousblockhash = ""
 };

};

// creates the block with some data
// new Block('SOME STRING');

// will contain the blockchain data
class Blockchain{
	
	// creates the constructor that will hold all chain data
	constructor(){

		// returns the array of data from levelDB, look at levelSanbox.js line 38-47
		// IMPORTANT: may have to return this within the addBlock function, to ensure
		// proper length is achieved
		this.chain = populateBlockchain();

		// sets global height for the blockchain
		// may need to use the getBlockHeight function as a challenge
		this.height = chain.length;
		
		// checks if block height is 0, creates genesis block
		if (height === 0) {

			// creates the genesis block, sets the data
			this.gen = new Block("Genesis block - First block in the chain");
			// ensures the blockchain always contains at least a single block
			// this is commonly refered to as the genesis block, as its the first block of the blockchain
			this.addBlock(this.gen)
		}

	}

	// adds a block to the chain constructor, effectively creating a blockchain!
	addBlock(newBlock){

		let { chain, height } = this
		// checks to see if the chain contains more than one block, to grab the previous block's hash

		// adds the height to the block, based on the length of the block chain
		newBlock.height = height;

		// adds the time stamp to the block
		// this date (UTC) format was chosen due to its compatability with external resources
		newBlock.time = new Date().getTime().toString.slice(0,-3)
		
		if (height > 0 ) {

			// sets the property of the new block as the previous block's hash
			newBlock.previousblockhash = 

				// searches the block prior to this one via the array's index
				// then grabs the hash from the .hash property of the previous block
				chain[chain.length-1].hash;
			
		
		}

		
		// this encrypts our block data with a SHA256 algorythm, encrypting the block!!
		newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

		// each block is finally pushed into the chain global constructor, creating our blockchain!
		addDataToLevelDB(newBlock);
	}

	  // Get block height
    getBlockHeight(){
      return addDataToLevelDB('',true);
    }

    // get block
    getBlock(blockHeight){
      // return object as a single string
      return getLevelDBData(this.height)
    }

    // validate block
    validateBlock(blockHeight){
      // get block object
      let block = this.getBlock(blockHeight);
      // get block hash
      let blockHash = block.hash;
      // remove block hash to test block integrity
      block.hash = '';
      // generate block hash
      let validBlockHash = SHA256(JSON.stringify(block)).toString();
      // Compare
      if (blockHash===validBlockHash) {
          return true;
        } else {
          console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
          return false;
        }
    }

   // Validate blockchain
   // may have to validate data with these two functions, test tomorrow
    validateChain(){
      let errorLog = [];
      for (var i = 0; i < this.chain.length-1; i++) {
        // validate block
        if (!this.validateBlock(i))errorLog.push(i);
        // compare blocks hash link
        let blockHash = this.chain[i].hash;
        let previousHash = this.chain[i+1].previousBlockHash;
        if (blockHash!==previousHash) {
          errorLog.push(i);
        }
      }
      if (errorLog.length>0) {
        console.log('Block errors = ' + errorLog.length);
        console.log('Blocks: '+errorLog);
      } else {
        console.log('No errors detected');
      }
    }

}

// creates blockchain
let blockchain = new Blockchain()

// adds data to the blockchain by storing a new block within the constructor 
blockchain.addBlock(new Block('test data'));

blockchain
/* outputs:
Blockchain {
  chain:
   [ Block {
       hash: '',
       height: 0,
       body: 'test data',
       time: 0,
       previousblockhash: '' } ] }
*/