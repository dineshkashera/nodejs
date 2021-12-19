const fs            =   require('fs');
const getnotes      =   require('./module-exports');
const validator     =   require('validator');
const chalk         =   require('chalk');
const yargs         =   require('yargs');
const notes         =   require('./notes');

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
    command:'add',
    describe:'Add Notes',
    builder:{
        title:{
            describe:'Add comment title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe: 'Add comment body',
            demandOption: true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.addNotes(argv.title,argv.body);
    }
});

yargs.command({
    command:'remove',
    describe:'remove comment',
    builder:{
        id:{
            describe:'Pass id to delete',
            demandOption: true,
            type:'integer'
        }
    },
    handler:function(argv){
        notes.removeNotes(argv.id);
    }
});

yargs.parse();