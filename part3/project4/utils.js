const validation = (message) =>{
	// sets our global validation variable
	global.signature = message;
	global.authWindow = 5;
	// first minute
	setTimeout(function(){
		global.authWindow = 4;
		console.log(`4 minutes remaining, your message is: ${messsage}`)
	}, 60000);

	// second minute
	setTimeout(function(){
		global.authWindow = 3;
		console.log(`3 minutes remaining, your message is: ${messsage}`)
	}, 60000*2);

	// third minute
	setTimeout(function(){
		global.authWindow = 2;
		console.log(`2 minutes remaining, your message is: ${messsage}`)
	}, 60000*3);

	// fourth minute
	setTimeout(function(){
		global.authWindow = 1;
		console.log(`1 minutes remaining, your authentication is about to expire! Your message is: ${messsage}`)
	}, 60000*4);

	// last minute
	setTimeout(function(){
		// deletes all authentication globals
		delete global.signature;
		delete global.address;
		delete global.authWindow;
		delete global.authenticated;
		
		console.log(`Your validation has expired, please visit the /requestValidation route to authenticate`)
	}, 60000*5);
}

module.exports = validation