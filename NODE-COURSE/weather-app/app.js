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
                getCurrentTemprature(argv.location);
        }
});

const getCurrentTemprature = (location) => {
        const requestURI = metaboxURL+location+'.json'+metaquery;
        request({url:requestURI,json:true},(error, response) => {
            if(error){
                 console.log(error);
            }else {
                    const getLatLang = response.body;
                    if(getLatLang.features.length > 0){
                        const latlong = getLatLang.features['0'].center;
                        const coordinate = latlong.reverse().toString();
                        console.log(coordinate);
                    }else{
                        console.log('Incorrect location enter!');
                    }

            }
        });
}

yargs.parse();
/*request({url:stackapiURL,json:true},(error, response) => {
        const weather = response.body.current;
        const temperature = weather.temperature;
        const precip      = weather.precip;
        const msg         = 'It is currently '+temperature+' degree, there is '+precip+'% chance of rain';
        console.log(msg);
});*/