const request  = require('request');

// take input from userfor the location
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

// const _  = require('lodash');
const argv = yargs
  .options({
    a:{
      demand:true,
      alias:'address',
      describe: 'Address to fetch weather for',
      string:true
    }
})
  .help()
  .alias('help','h')
  .argv;
  // console.log(argv);


geocode.geocodeAddress(argv.address,(errorMessage,results) => {
  if(errorMessage) {
    // console.log('statusCode:', response && response.statusCode);
    console.log(errorMessage);
  }
  else {
    console.log(JSON.stringify(results.address,undefined,2));
    weather.getWeather(results,(errorMessage,weatherResults) => {
      if(errorMessage) {
        console.log(errorMessage);
      }
      else {
        console.log(`it's currently ${weatherResults.temperature}. it feels like ${weatherResults.apparentTemprature}`);
      }
    });

}
});



// https://api.darksky.net/forecast/4c57abcb8b708730dae5f959ca5ef85d/37.8267,-122.4233
