const routes = {
	port: process.env.PORT || 8000,
	main: '/',
	health: '/health',
	addBlock: '/addBlock',
	getBlock: '/block',
	postBlock: '/block'
};

module.exports = routes;
