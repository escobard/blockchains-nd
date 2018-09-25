const express = require("express"),
	bodyParser = require("body-parser");

const { port } = require("./constants/routes");

// sets the global variable for the API services
global.level = require("./services/Level");
global.stars = require("./services/Stars");
global.blockchain = require("./services/Blockchain");


const app = express();

app.use(bodyParser.json());

require("./routes")(app);

let server = app.listen(port, () => {
	console.log("server listening at port %s", port);
});

module.exports = server;