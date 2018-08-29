const validation = message => {
	// sets our global validation variable
	global.signature = message;
	global.authWindow = 5;
	console.log(`5 minutes remaining, your message is: ${message}`);
	// first minute
	setTimeout(function() {
		global.authWindow = 4;
		console.log(`4 minutes remaining, your message is: ${message}`);
	}, 60000);

	// second minute
	setTimeout(function() {
		global.authWindow = 3;
		console.log(`3 minutes remaining, your message is: ${message}`);
	}, 60000 * 2);

	// third minute
	setTimeout(function() {
		global.authWindow = 2;
		console.log(`2 minutes remaining, your message is: ${message}`);
	}, 60000 * 3);

	// fourth minute
	setTimeout(function() {
		global.authWindow = 1;
		console.log(
			`1 minutes remaining, your authentication is about to expire! Your message is: ${message}`
		);
	}, 60000 * 4);

	// last minute
	setTimeout(function() {
		// deletes all authentication globals
		delete global.signature;
		delete global.address;
		delete global.authWindow;
		delete global.authenticated;

		console.log(
			`Your validation has expired, please send a post request to /requestValidation route to authenticate`
		);
	}, 60000 * 5);
};

// sets regex to test if stored value is in hex encoding
const hexRegex = /[0-9A-Fa-f]{6}/g;

// returns true if string is hex encoded
const checkHex = string => {
	if (hexRegex.test(string)) {
		return true;
	} else {
		return false;
	}
};

// sets the ascii js regex
const asciiRegex = /^[\x00-\x7F]*$/;

// returns true if string contains only ascii characters
const checkAscii = string => {
	if (asciiRegex.test(string)) {
		return true;
	} else {
		return false;
	}
};

// converts hex encode to readable string
const hexToAscii = hex => {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
};

const wordCount = str => {
	return str.split(" ").filter(function(n) {
		return n != "";
	}).length;
};

module.exports = { validation, checkHex, checkAscii, hexToAscii, wordCount };