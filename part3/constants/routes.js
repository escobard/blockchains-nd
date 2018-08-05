const routes = {
	port: process.env.PORT || 8000,
	main: '/',
	health: '/health',
	addBlock: '/addBlock',
	getBlock: '/getBlock/',
	getHeight: '/getHeight'
};

module.exports = routes;
