const fs = require('fs');

const fileLocation = './sampleData/1-json.json';
const binaryBuffer = fs.readFileSync(fileLocation);
const toJsonString = binaryBuffer.toString();
const toJsonObj    = JSON.parse(toJsonString);

//change name and age from json object
toJsonObj.name = "DineshKashera2";
toJsonObj.age = 32;
console.log(toJsonObj.name);

const newJsonstring = JSON.stringify(toJsonObj);
//write into file
fs.writeFileSync(fileLocation,newJsonstring);