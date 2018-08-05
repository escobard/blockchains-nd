const express = require("express"),
bodyParser = require("body-parser");

const { port } = require("./constants/routes");
const blockchain = require("./services/blockchain");
const app = express();

app.use(bodyParser.json());

require('./routes')(app);

let server = app.listen(port, () => {
	console.log("server listening at port %s", port);
});

module.exports = server;
