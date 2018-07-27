// navigate to this folder and type the `node` command, then copy and pase
// the code below into the terminal node.js runtime
// need to remove all commentary by going:
// control find = //, select all
// shift + end, selects all lines

// each class and constant must be entered one at a time in the console to work

// loads the SHA256 library to encrypt - SO COOL
const SHA256 = require('crypto-js/sha256');

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
		this.chain = [];

		// ensures the blockchain always contains at least a single block
		// this is commonly refered to as the genesis block, as its the first block of the blockchain
		this.addBlock(new Block("Genesis block - First block in the chain"))
	}

	// adds a block to the chain constructor, effectively creating a blockchain!
	addBlock(newBlock){

		let { chain } = this
		// checks to see if the chain contains more than one block, to grab the previous block's hash

		// adds the height to the block, based on the length of the block chain
		newBlock.height = chain.length;

		// adds the time stamp to the block
		// this date (UTC) format was chosen due to its compatability with external resources
		newBlock.time = new Date().getTime().toString.slice(0,-3)
		
		if (chain.length > 0 ) {

			// sets the property of the new block as the previous block's hash
			newBlock.previousblockhash = 

				// searches the block prior to this one via the array's index
				// then grabs the hash from the .hash property of the previous block
				chain[chain.length-1].hash;
			
		
		}

		
		// this encrypts our block data with a SHA256 algorythm, encrypting the block!!
		newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();




		// each block is finally pushed into the chain global constructor, creating our blockchain!
		chain.push(newBlock);
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