const {
	validateProperties,
	checkHex,
	asciiToHex,
	checkAscii,
	hexToAscii,
	wordCount
} = require("../utils");

module.exports = async (req, res, next) => {
	let { body: { star, address } } = req;

	// checks to make sure the object has the correct object values
	/*{
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
        "dec": "-26° 29' 24.9",  // declination
        "ra": "16h 29m 1.0s",  // right ascension
        "mag": "magniture string, optional",
        "con: "constellation string, optional"
        "star_story": "Hex encoded string, limited to 250 words"
    }
	}*/

	// ensures required properties are sent on the request
	if (star.star_story && star.dec && star.ra && address) {

		// ensures only the allowed properties are introduced
		let checkProperties = validateProperties(star);
		
		if (checkProperties) {
			console.log("Valid object properties, checking story encoding...");

			// encodes unicode to hex
			let ascii = asciiToHex(star.star_story);
			console.log("ENCODED STRING", ascii);
			if (ascii) {
				console.log("Valid hex, checking ascii characters...");

				// converts story from hex to asii
				let convertAscii = hexToAscii(star.star_story);
				console.log("HEX STRING DECODED", convertAscii);

				// checks if converted string contains only ascii characters
				let ascii = checkAscii(convertAscii);

				if (ascii) {
					console.log("Valid characters, checking story word length...");
					// checks total word count of string
					let count = wordCount(convertAscii);

					// ensures story word count is less than 250
					if (count <= 250) {
						// final validation, block data valid!
						console.log("Success, block data is valid, creating new block...");
						next();
					} else {
						console.log("Failed, star.star_story contains more than 250 words!");

						res.status(401).json({
							status: "Failed, star.star_story contains more than 250 words!",
							authenticated: false
						});
					}
				} else {
					console.log("Failed, star.star_story contains invalid ascii characters!");

					res.status(401).json({
						status: "Failed, star.star_story contains invalid ascii characters!",
						authenticated: false
					});
				}
			} else {
				res.status(401).json({
					status: "Failed, star.star_story is not hex encoded!",
					authenticated: false
				});
			}
		} else {
			res.status(401).json({
				status: "Failed, invalid properties!",
				authenticated: false
			});
		}
	} else {
		console.log("Failed, invalid post object values");

		res.status(401).json({
			status: "Failed, invalid post object values",
			authenticated: false
		});
	}
};