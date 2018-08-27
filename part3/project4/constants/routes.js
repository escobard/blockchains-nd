const routes = {
	port: process.env.PORT || 8000,
	main: '/',
	block: 'block',
	notary: '/notary',
	health: '/health',
	addBlock: '/addBlock',
	getBlock: '/block',
	postBlock: '/block',
	getHeight: '/getBlockHeight',
	requestValidation: '/requestValidation',
	messageSignature: '/message-signature/validate',
	block: '/block',
	starsHash: '/stars/hash',
	starsAddress: '/stars/address',
	starsHeight: '/stars/height'
};

module.exports = routes;
