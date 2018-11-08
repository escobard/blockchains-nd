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

{
    blockchain: {
        chain: [
            {
                hash: "050a5ed6c537bbf8f63cff1c297617aad9f7f8b12d6b4c2f41a38371cc36ba80",
                height: 0,
                body: "Genesis block - First block in the chain",
                time: "1541637545",
                previousblockhash: ""
            },
            {
                hash: "3d344d97bf037d045a8dcd46ed659e54d1f7160625ca0a8690e44ad6f4254eff",
                height: 1,
                body: {
                    address: "19xSGYkKgStMzqPthuJ4VW7C3XS2SUYTkE",
                    star: {
                        dec: "-26° 29' 24.9",
                        ra: "16h 29m 1.0s",
                        mag: "magniture string, optional",
                        con: "constellation string, optional",
                        star_story: "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
                    }
                },
                time: "1541718988",
                previousblockhash: "050a5ed6c537bbf8f63cff1c297617aad9f7f8b12d6b4c2f41a38371cc36ba80"
            }
        ],
            height: 2
    }
}