module.exports = async (req, res, next) => {

	let chain = await blockchain.fetchBlockchain();
	blockchain.setBlockHeight(chain.length);
	blockchain.chain = chain;

	if (chain.length) {
		next();
	}
	else if (chain.length >= 2) {
		blockchain.validateChain()
	}
	else if (chain === undefined){
		return res
			.status(401)
			.send({ error: "Database is undefined!" });
	}
	else{
		blockchain.createGenesis();
		return res
			.status(200)
			.send({ loading: "Blockchain is being initialized, refresh the page" });
	}
	
};
