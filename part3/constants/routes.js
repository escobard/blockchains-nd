const routes = {
	port: process.env.PORT || 8000,
	main: '/',
	health: '/health',
	addBlock: '/addBlock',
	getBlock: '/getBlock/',
	getHeight: '/getBlockHeight'
};

module.exports = routes;
