const fs            =   require('fs');
const getnotes      =   require('./module-exports');
const validator     =   require('validator');
const chalk         =   require('chalk');
const yargs         =   require('yargs');

const log           =   console.log;
fs.writeFileSync('notes.txt','hello, i am dineshkashera');
log(getnotes());//Get notes String
log(validator.isEmail('dineshkashera@gmail.com'));//check is email
log(validator.isURL('https:google.com'));//check valid URL

log(chalk.blue.bold.bgWhite('Success!'));

//log(process.argv);//to get the parameters from terminal

//creating command
yargs.version('1.1.0');
//create list command
yargs.command({
    command:'list',
    describe:'Listing call',
    handler:function(){
        console.log('listing handler call')
    }
});

yargs.command({
    command:'read',
    describe:'reading notes call',
    handler:function(){
        console.log('reading handler call')
    }
});

yargs.command({
    command:'comment',
    describe:'get comment',
    builder:{
        add:{
            describe:'Add new comment',
            demandOption: true,
            type:'string'
        }
    },
    handler:function(argv){
        console.log('Comment Added:' + argv.add)
    }
});

yargs.parse();