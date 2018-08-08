let level = require("level");
let chainDB = "./data";
let db = level(chainDB);

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
      i++
      // console.log('DATA CREATED', data, i)
    })
    .on("error", function(err) {
      return console.log("Unable to read data stream!", err);
    })
    .on("close", function() {
      //console.log("Block #" + i);

      addLevelDBData(i, value);
    })
    .on('end', function(){
      if (height) {
        height = i
        return height
      }
    })
};

const populateBlockchain = array => {
  let i = 0;
  db
    .createReadStream()
    .on("data", function(data) {
      let { value, key } = data;
      //console.log("DATA", data, i);
      let parsed = JSON.parse(value)
      array.push(parsed)
      // console.log('ARRAY', array)
    })
    .on("error", function(err) {
      return console.log("Unable to read data stream!", err);
    })
    .on("close", function() {
      // console.log('ARRAY ON CLOSE', array)
    });
    return array;
};

const checkHeight = (height) =>{
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
      console.log('HEIGHT:', height);
    });
    return height;
}

module.exports = { checkHeight, getLevelDBData, populateBlockchain, addDataToLevelDB }