const fs            =   require('fs');
const getnotes      =   require('./module-exports');
const validator     =   require('validator');
const chalk         =   require('chalk');

const log           =   console.log;
fs.writeFileSync('notes.txt','hello, i am dineshkashera');
log(getnotes());//Get notes String
log(validator.isEmail('dineshkashera@gmail.com'));//check is email
log(validator.isURL('https:google.com'));//check valid URL

log(chalk.blue('Success!'));