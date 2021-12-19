const request   =   require('request');
const apiURL    =   'http://api.weatherstack.com/current?access_key=dc65e012d473c1e07f20ee3a2bb53561&query=37.8267,-122.4233';

request({url:apiURL},(error, response) => {
        const data = JSON.parse(response.body);
        console.log(data.current);
});