const fs = require('fs');
fs.writeFileSync('notes.txt','hello, i am dineshkashera');

const getnotes = require('./module-exports');
console.log(getnotes());

const validator = require('validator');
console.log(validator.isEmail('dineshkashera@gmail.com'));//check is email

console.log(validator.isURL('https:google.com'));