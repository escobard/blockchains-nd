module.exports = async (req, res, next) => {

	// fetches data from the levelDB helper function
	// due to how promises work, all conditions MUST check this variable
	// rather than the blockchain.chain property for proper async functioanlity
	let chain = await blockchain.fetchBlockchain();

	// sets block height
	blockchain.setBlockHeight(chain.length);

	// adds fetched data into the .chain property of the blockchain class
	blockchain.chain = chain;

	// checks to see if the chain variable has a length, passes on to the route
	if (chain.length) {
		next();
	}
	// validates the chain if the height of the blockchain is greater than 2
	else if (chain.length >= 2) {
		blockchain.validateChain()
	}
	// breaks the loop if leveldb is undefined
	else if (chain === undefined){
		return res
			.status(401)
			.send({ error: "Database is undefined!" });
	}
	// if genesis needs to be created, creates it and returns a response
	else{
		blockchain.createGenesis();
		return res
			.status(200)
			.send({ loading: "Blockchain is being initialized, refresh the page" });
	}
	
};
