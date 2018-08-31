const routes = {
	port: process.env.PORT || 8000,
	main: '/',
	block: 'block',
	notary: '/notary',
	health: '/health',
	addBlock: '/addBlock',
	getHeight: '/getBlockHeight',
	requestValidation: '/requestValidation',
	messageSignature: '/message-signature/validate',
	block: '/block',
	stars: '/stars',
};

module.exports = routes;
