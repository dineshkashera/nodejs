const request           =    require('request');
const yargs             =    require('yargs');
const forcast           =    require('./get-temprature.js');
const stackapiURL       =    'http://api.weatherstack.com/current?access_key=dc65e012d473c1e07f20ee3a2bb53561';
const stackQuery        =    '&query=';

//create command to get temprature by place name
yargs.command({
        command:'temp',
        describe:'Get latest Temprature',
        builder:{
                location:{
                        describe:'Enter current location to get temprature',
                        demandOption: true,
                        type:'string'
                }
        },
        handler(argv){
            forcast.getCurrentTemprature(argv.location,(getCoordinate) => {
                    const reqtempURI = stackapiURL+stackQuery+getCoordinate;
                    request({url:reqtempURI,json:true},(error, {body}) => {
                        const weather     = body.current;
                        const {temperature,precip} = weather;
                        const msg         = 'It is currently '+temperature+' degree, there is '+precip+'% chance of rain';
                        console.log(msg);
                    });
                });
        }
});

yargs.parse();