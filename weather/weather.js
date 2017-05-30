const request  = require('request');



var getWeather  = (results,callback) => {
  request({
    // url: `https://api.foracast.io/forecast/4c57abcb8b708730dae5f959ca5ef85d/${results.latitude},${results.longitude}`,
    url: `https://api.darksky.net/forecast/4c57abcb8b708730dae5f959ca5ef85d/${results.latitude},${results.longitude}`,
    json:true
  },(error, response, body) => {
    // console.log('statusCode:', response && response.statusCode);
    if (error) {
      // console.log('unable to connect to forecast.io service');
      callback('unable to connect to forecast.io service');
    } else if(response.statusCode === 404) {
      // console.log('Bad forecast.io address');
      callback('Bad forecast.io address');
    }
    else if (!error &&response.statusCode === 200){
      callback(undefined,{
        temperature: body.currently.temperature,
        apparentTemprature : body.currently.apparentTemperature
      });
      // console.log(JSON.stringify(body.currently.temperature,undefined,2));
      // return body.currently.temperature;
    }
    else {
      console.log('unable to fetch weather');
    }
  });
};
module.exports.getWeather = getWeather;
