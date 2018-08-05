const routes = {
	port: process.env.PORT || 8000,
	main: '/'
	health: '/health',
	getBlock: '/getBlock/',
	getHeight: '/getHeight'
};

module.exports = routes;
