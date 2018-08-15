module.exports = async (req, res, next) => {

	// handles initial blockchain population
	blockchain.chain = await blockchain.fetchBlockchain();
	blockchain.setBlockHeight(blockchain.chain.length);
	if (blockchain.chain.length) {
			// checks block height, create genesis
	if (blockchain.height === 0) {
		console.log('Populating blockchain with genesis block...')
		blockchain.createGenesis();
	}
	if (blockchain.height >= 2) {
		blockchain.validateChain()
	}
		next();
	}
	else{
		console.log('FAILED', blockchain)
		return res
			.status(500)
			.send({ error: "No chain loaded" });
	}
	
};
