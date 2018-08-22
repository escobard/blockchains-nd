const routes = {
	port: process.env.PORT || 8000,
	main: '/',
	notary: '/notary',
	health: '/health',
	addBlock: '/addBlock',
	getBlock: '/block',
	postBlock: '/block',
	getHeight: '/getBlockHeight'
};

module.exports = routes;
