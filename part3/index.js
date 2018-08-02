const express = require("express"),
bodyParser = require("body-parser");

const { port } = require("./constants/routes");

const app = express();

app.use(bodyParser.json());

let server = app.listen(port, () => {
	console.log("server listening at port %s", port);
});

module.exports = server;
