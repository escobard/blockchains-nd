const { checkHex, asciiToHex, checkAscii, hexToAscii, wordCount } = require("../utils");

module.exports = async (req, res, next) => {
	let { body: { star, address } } = req;

	// checks to make sure the object has the correct object values
	/*{
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
        "dec": "-26° 29' 24.9",  // declination
        "ra": "16h 29m 1.0s",  // right ascension
        "story": "Found star using https://www.google.com/sky/"
    }
	}*/
	
	if (star.story && star.dec && star.ra && address) {

		console.log("Valid object properties, checking story encoding...");
		
		// encodes unicode to hex
		let ascii = asciiToHex(star.story);
		console.log('ENCODED STRING', ascii)
		if (ascii) {

			console.log("Valid hex, checking ascii characters...");
			
			// converts story from hex to asii
			let convertAscii = hexToAscii(star.story);
			console.log('HEX STRING DECODED', convertAscii)
			
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
				} 

				else {
					
					console.log("Failed, star.story contains more than 250 words!");
					
					res.status(401).json({
						status: "Failed, star.story contains more than 250 words!",
						authenticated: false
					});
				}
			} 

			else {
				
				console.log("Failed, star.story contains invalid ascii characters!");
				
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
		
		console.log("Failed, invalid post object values");
		
		res.status(401).json({
			status: "Failed, invalid post object values",
			authenticated: false
		
		});
	}
};