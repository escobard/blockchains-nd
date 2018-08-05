const routes = {
	port: process.env.PORT || 8000,
	getBlock: '/getBlock/:blockHeight',
	getHeight: '/getHeight'
};

module.exports = routes;
