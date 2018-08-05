let level = require("level");
let chainDB = "../data";
let db = level(chainDB);

const SHA256 = require("crypto-js/sha256");

// need to split up all levelDB functionality into a utils file
function addLevelDBData(key, value) {
  db.put(key, value, function(err) {
    if (err) return console.log("Block " + key + " submission failed", err);
  });
}

const getLevelDBData = (key) => {
  db.get(key, function(err, value) {
    if (err) return console.log('Not found!', err);
    console.log('Value = ' + value);
    return value;
  })
}

const addDataToLevelDB = (value, height) => {
  let i = 0;
  db
    .createReadStream()
    .on("data", function(data) {
      i++;
    })
    .on("error", function(err) {
      return console.log("Unable to read data stream!", err);
    })
    .on("close", function() {
      console.log("Block #" + i);
      if (height) {
        height = i;
      }
      addLevelDBData(i, value);
    });
};

const populateBlockchain = array => {
  db
    .createReadStream()
    .on("data", function(data) {
      let { value } = data;
      console.log("DATA", value);
      array.push(JSON.parse(value));
    })
    .on("error", function(err) {
      return console.log("Unable to read data stream!", err);
    })
    .on("close", function() {
      console.log(array);
    });
  return array;
};

module.exports = { getLevelDBData, populateBlockchain, addDataToLevelDB }