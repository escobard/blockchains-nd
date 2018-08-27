const { checkHex, checkAscii, hexToAscii, wordCount } = require("../utils");

module.exports = async (req, res, next) => {
	let { body: { star, address } } = req;

	// checks to make sure the object has the correct object values
	// {body: {star: {coordinates, story}, address: 'walletAddress'}}
	if (star.story && star.coordinates && address) {
		console.log("Valid object properties, checking story encoding...");
		// checks to ensure star.story is hex encoded
		let hex = checkHex(star.story);
		if (hex) {
			// converts story from hex to asii
			let convertAscii = hexToAscii(star.story);

			// checks if converted string contains only ascii characters
			let ascii = checkAscii(convertAscii);
			if (ascii) {
				// checks total word count of string
				let count = wordCount(convertAscii);

				// ensures story word count is less than 250
				if (count <= 250) {
					// final validation, block data valid!
					next()
				} else {
					res.status(401).json({
						status: "Failed, star.story contains invalid ascii characters!",
						authenticated: false
					});
				}
			} else {
				res.status(401).json({
					status: "Failed, star.story contains invalid ascii characters!",
					authenticated: false
				});
			}
		} else {
			res.status(401).json({
				status: "Failed, star.story is not hex encoded!",
				authenticated: false
			});
		}
	} else {
		res.status(401).json({
			status: "Failed, invalid post object values",
			authenticated: false
		});
	}
};