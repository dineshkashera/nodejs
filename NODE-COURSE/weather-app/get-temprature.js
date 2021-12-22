const request           =    require("request");
const metaboxURL        =    'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxAPI         =    'pk.eyJ1IjoiZGluZXNoa2FzaGVyYSIsImEiOiJja3hleGttOWcxNmc5MnVtbTl3ajV6bm16In0.fxwuVxBZNcI630kRrxcYmw';
const metaquery         =    '?access_token='+mapboxAPI;

const getCurrentTemprature = (location,callback) => {
    const requestURI = metaboxURL+location+'.json'+metaquery;
    request({url:requestURI,json:true},(error, {body}) => {
        if(error){
            console.log(error);
        }else {
            const getLatLang = body;

            if((getLatLang.hasOwnProperty('features')) && (getLatLang.features.length > 0) && (getLatLang.features.length !== null)){
                const {1:lat,0:long} = getLatLang.features['0'].center;
                callback(lat+','+long);//use of callback function
            }else{
                console.log('Incorrect location enter!');
            }

        }
    });
}

module.exports = {
    getCurrentTemprature
};