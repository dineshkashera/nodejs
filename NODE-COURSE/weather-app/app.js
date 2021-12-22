const request           =    require('request');
const yargs             =    require('yargs');
const stackapiURL       =    'http://api.weatherstack.com/current?access_key=dc65e012d473c1e07f20ee3a2bb53561';
const stackQuery        =    '&query=';
const metaboxURL        =    'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxAPI         =    'pk.eyJ1IjoiZGluZXNoa2FzaGVyYSIsImEiOiJja3hleGttOWcxNmc5MnVtbTl3ajV6bm16In0.fxwuVxBZNcI630kRrxcYmw';
const metaquery         =    '?access_token='+mapboxAPI;

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
                getCurrentTemprature(argv.location,(getCoordinate) => {
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

const getCurrentTemprature = (location,callback) => {
        const requestURI = metaboxURL+location+'.json'+metaquery;
        request({url:requestURI,json:true},(error, response) => {
            if(error){
                 console.log(error);
            }else {
                    const getLatLang = response.body;

                    if((getLatLang.hasOwnProperty('features')) && (getLatLang.features.length > 0) && (getLatLang.features.length !== null)){
                        const {1:lat,0:long} = getLatLang.features['0'].center;
                        callback(lat+','+long);//use of callback function
                    }else{
                        console.log('Incorrect location enter!');
                    }

            }
        });
}

yargs.parse();