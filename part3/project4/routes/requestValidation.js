"use strict";

const router = require("express").Router(),
WAValidator = require("wallet-address-validator"),
{validation} = require("../utils")

// This route expects the following JSON {address: 'walletAddressString'}
router.post("/", (req, res) => {
	let { body:{address} } = req;

	// should handle this via a class function instance, to keep all logic centralized
	if (!address) {
		console.log("Wallet address is undefined!");
		res.status(401).json({
			walletAddress: "Wallet address is undefined!"
		});
	} else {
		let valid = WAValidator.validate(address, "BTC");

		if (valid) {
			// handle valid logic here
			// using recommended number only format
			console.log(address, " is a valid address");

			// sets the wallet address global property
			global.address = address;

			let timestamp = new Date().getTime().toString().slice(0, -3);

			// sets the message signature
			let message = `${address}:${timestamp}:starRegistry`;

			// starts the timer for validation time window
			validation(message)
			res.status(200).json({
				status: 'Success, copy the string below to sign your block',
				message
			});
		} else {
				console.log('Failed, address is invalid', address);
				res.status(401).json({
				status: 'Failed, address is invalid',
				message: undefined
			});
		}
	}
});

module.exports = router;