const fs = require('fs')
const csv = require('csvtojson');
let fileReadStream = fs.createReadStream("nodejs.csv");

//** Property key to be deleted. */
const KEY_TO_DELETE = 'amount';

//** Test regexp to validate each parced file line. */
const VALID_PATTERN = /^[a-zA-Z]+$/;

//** deletes unnecessary property.  */
const replacer = function() {
    return function(key, value) {
        if (key.toLowerCase() === KEY_TO_DELETE) {
            return undefined
        }
        return value;
    }
}

csv({trim:true, noheader:false})
.preFileLine((fileLineString, lineIdx)=>{
    if (VALID_PATTERN.test(fileLineString)) {
        console.log(`Line #${lineIdx + 1} is invalid, skipping:`, fileLineString);
        fileLineString = "";
    }
    return fileLineString;
})
.fromStream(fileReadStream)
.subscribe((dataObj) => {
    fs.appendFileSync('text-file.txt', JSON.stringify(dataObj, replacer()));
    fs.appendFileSync('text-file.txt', '\n');
})
.on('done',(error)=>{
    if (error) {
        console.log('Error while writing file...')
    }
    console.log('Done')
})
