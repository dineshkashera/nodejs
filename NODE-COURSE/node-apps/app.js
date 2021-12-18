const fs = require('fs');
fs.writeFileSync('notes.txt','hello, i am dineshkashera');

const getnotes = require('./module-exports');
console.log(getnotes());