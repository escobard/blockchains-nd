module.exports = async (req, res, next) => {

	// passed middleware logic once the global signature variable exists for validation
	if (signature) {
		console.log("Validation time window open, proceeding to route...");
		next();
	} else {
		res.status(401).json({
			status: "Failed, no address has been submitted for authentication",
			message: undefined
		});
	}
};