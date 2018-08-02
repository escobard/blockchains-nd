/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

let level = require('level');
let chainDB = './chaindata';
let db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
  db.put(key, value, function(err) {
    if (err) return console.log('Block ' + key + ' submission failed', err);
  })
}

// Get data from levelDB with key
const getLevelDBData = (key) =>{
  db.get(key, function(err, value) {
    if (err) return console.log('Not found!', err);
    console.log('Value = ' + value);
    return 
  })
}

// Add data to levelDB with value
const addDataToLevelDB = (value, height) => {
    let i = 0;
    db.createReadStream().on('data', function(data) {
          i++;
          console.log(data)
        }).on('error', function(err) {
            return console.log('Unable to read data stream!', err)
        }).on('close', function() {
          console.log('Block #' + i);
          console.log('data' + data);
          if (height) {
            return i;
          }
          addLevelDBData(i, value);
        });
}

const populateBlockchain = () =>{
    let blockchain;
    db.createReadStream().on('data', function(data) {
        }).on('error', function(err) {
            return console.log('Unable to read data stream!', err)
        }).on('close', function() {
          blockchain = data;
        });
        return blockchain
}

module.exports = {addLevelDBData, populateBlockchain, getLevelDBData}