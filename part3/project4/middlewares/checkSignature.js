module.exports = async (req, res, next) => {

	// passed middleware logic once the global signature variable exists for validation
	if (global.address === req.body.address) {
		// consider creating some logic to handle the plurality of the minute(s) text
		console.log(`Validation time window open for ${authWindow} minutes, proceeding to route...`);
		next();
	} else {
		res.status(401).json({
			status: "Failed, no address has been submitted for authentication",
			message: undefined
		});
	}
};