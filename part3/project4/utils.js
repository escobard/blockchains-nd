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
const checkAscii = str => {
	if (asciiRegex.test(str)) {
		return true;
	} else {
		return false;
	}
};

// encodes unicode string to hex
const asciiToHex = str => {
	var result = "";
	for (var i = 0; i < str.length; i++) {
		result += str.charCodeAt(i).toString(16);
	}
	return result;
};

// decodes hex string to unicode
const hexToAscii = hex => {
	var str = "";
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
};

const wordCount = str => {
	return str.split(" ").filter(function(n) {
		return n != "";
	}).length;
};

let timer = (countDownDate) => {
	setInterval(function() {
		// Get todays date and time
		let now = new Date().getTime();

		// Find the distance between now and the count down date
		let distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// returns full date
		return days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

		// returns expired once expired
		if (distance < 0) {
			clearInterval(x);
			return 'EXPIRED'
		}
	}, 1000);
};

module.exports = {
	validation,
	checkHex,
	checkAscii,
	asciiToHex,
	hexToAscii,
	wordCount,
	timer
};