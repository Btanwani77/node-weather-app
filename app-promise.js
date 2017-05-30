const request  = require('request');

// take input from userfor the location
const yargs = require('yargs');
const axios = require('axios');
// const geocode = require('./geocode/geocode');
// const weather = require('./weather/weather');

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

  var encodedAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
  axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.')
    }
    var weatherUrl = `https://api.darksky.net/forecast/4c57abcb8b708730dae5f959ca5ef85d/${response.data.results[0].geometry.location.lat},${response.data.results[0].geometry.location.lng}`
    // console.log(response.data.results[0].geometry.location.lng);
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemprature = response.data.currently.apparentTemperature;
    console.log(`its currently ${temperature}, it feels like ${apparentTemprature}`);
  }).catch((errorMessage) => {
    if (errorMessage.code === 'ENOTFOUND') {
      console.log('unable to connect to api service');
    } else {
      console.log(errorMessage.message);
    }
    // console.log(errorMessage);
  });




// https://api.darksky.net/forecast/4c57abcb8b708730dae5f959ca5ef85d/37.8267,-122.4233
