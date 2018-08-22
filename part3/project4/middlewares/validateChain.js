module.exports = async (req, res, next) => {

	// need to tweak the logic here to actually validate data
	let valid = false;
	// checks to see if the blockchain contains genesis, skips validation
	if (chain.length === 1) {
		next();
	}

	// if chain is greater than 2, validate block
	else if (chain.length >= 2) {

		// this functionality needs to be added to validate the block
		blockchain.validateBlockData()
	}

	// passed middleware logic once the valid variable = true
	if (valid) {
		console.log('Block is valid, adding to the chain...');
		next()
	}
	
};
