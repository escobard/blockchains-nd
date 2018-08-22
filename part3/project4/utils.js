const validation = (message) =>{
	// sets our global validation variable
	global.validation = true;

	// first minute
	setTimeout(function(){
		console.log(`4 minutes remaining, your message is: ${messsage}`)
	}, 60000);

	// second minute
	setTimeout(function(){
		console.log(`3 minutes remaining, your message is: ${messsage}`)
	}, 60000*2);

	// third minute
	setTimeout(function(){
		console.log(`2 minutes remaining, your message is: ${messsage}`)
	}, 60000*3);

	// fourth minute
	setTimeout(function(){
		console.log(`1 minutes remaining, your authentication is about to expire! Your message is: ${messsage}`)
	}, 60000*4);

	// last minute
	setTimeout(function(){
		delete global.validation;
		console.log(`Your validation has expired, please visit the /requestValidation route to authenticate`)
	}, 60000*5);
}

module.exports = validation