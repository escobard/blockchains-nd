const express = require("express"),
bodyParser = require("body-parser");

const {
  getLevelDBData,
  populateBlockchain,
  addDataToLevelDB
} = require("./models/utils");

const { port } = require("./constants/routes");

global.blockchain = require("./services/Blockchain");
global.level = require("./services/Level");

const app = express();

app.use(bodyParser.json());

require('./routes')(app);

let server = app.listen(port, () => {
	console.log("server listening at port %s", port);
});

module.exports = server;
