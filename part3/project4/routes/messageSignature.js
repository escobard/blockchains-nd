"use strict";

const router = require("express").Router(),
	checkAddress = require("../middlewares/checkAddress"),
	{
		validateSignature
	} = require("../utils");

router.post("/", checkAddress, async (req, res) => {
	let { body } = req;

	// need to refactor into the star class
	// checks to see if the request signature and wallet match globals
	if (body.address == global.address) {
		// sets the authenticated variable to true, granting user access
		global.authenticated = true;

		// checking message signature
		let validSignature = validateSignature(global.message, body.address, body.signature);
		if (validSignature) {
			console.log(
				`Access granted, time remaining to add data: ${global.authWindow}`
			);
			res.status(200).json({
				registerStar: true,

				status: {
					address: global.address,
					requestTimestamp: global.timestamp,
					message: global.message,
					validationWindow: global.authWindow,

					// checks the message signature, with the stored message, addres and signature from the request
					messageSignature: validSignature
				}
			});
		} else {
			console.log(`Access denied, invalid signature`);
			res.status(401).json({
				registerStar: false,
				status: {
					description: "Failed, invalid signature",
					messageSignature: false,
					signature: body.signature
				}
			});
		}
	} else {
		console.log(
			`Access denied, stored address values do not match request address`
		);
		res.status(401).json({
			status: "Failed, stored address values do not match request address",
			signature: body.signature,
			address: body.address
		});
	}
});

module.exports = router;