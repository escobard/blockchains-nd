const express = require("express"),
bodyParser = require("body-parser");

const { port } = require("./constants/routes");
// this can be commented out to start the blockchain and test timeout functions
// const blockchain = require("./services/blockchain");
const app = express();
let blockchain = require("./services/blockchain");

app.use(bodyParser.json());

require('./routes')(app);

let server = app.listen(port, () => {
	console.log("server listening at port %s", port);
});

module.exports = server;
