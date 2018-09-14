"use strict";

const router = require("express").Router(),
	WAValidator = require("wallet-address-validator"),
	{ validation, timer } = require("../utils");

// This route expects the following JSON {address: 'walletAddressString'}
router.post("/", (req, res) => {
	let { body: { address } } = req;

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

			let timestamp, countDownDate, authWindow;
			// creates logic to add timestamp global letiable for authentication window
			if (global.timestamp) {
				timestamp = global.timestamp;
				countDownDate = global.countDownDate;
				authWindow = global.authWindow
			} 
			// creates the timestamp && countDownDate variables
			else {
				timestamp = new Date()
					.getTime()
					.toString()
					.slice(0, -3);

				// Set the date we're counting down to 5 minutes
				let newDate = new Date()
				countDownDate = new Date( newDate.getTime()+ 5*60000);
				authWindow = `New star registration requests valid for another 299 seconds`;
				// sets global variables
				global.timestamp = timestamp;
				global.countDownDate = countDownDate;
				global.authWindow = authWindow;
			}

			// sets the message signature
			let message = `${address}:${timestamp}:starRegistry`;
			global.message = message;
			// starts the timer for validation time window
			console.log(authWindow)
			timer(countDownDate);
			res.status(200).json({
				status: "Success, copy the string basdfsfsdelow to sign your block",
				address,
				message,
				timestamp,
				validationWindow: authWindow
			});
		} else {
			console.log("Failed, address is invalid", address);
			res.status(401).json({
				status: "Failed, address is invalid",
				message: undefined
			});
		}
	}
});

module.exports = router;