const routes = {
	port: process.env.PORT || 8000,
	health: '/health',
	getBlock: '/getBlock/',
	getHeight: '/getHeight'
};

module.exports = routes;
