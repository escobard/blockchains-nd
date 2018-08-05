const routes = {
	port: process.env.PORT || 8000,
	health: '/health'
	getBlock: '/getBlock/:blockHeight',
	getHeight: '/getHeight'
};

module.exports = routes;
