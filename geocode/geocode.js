const request  = require('request');
var geocodeAddress = (address,callback) => {
  var encodedAddress = encodeURIComponent(address);
  console.log(encodedAddress);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
  },(error, response, body) => {
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (error) {
      callback('unable to connect to Google Servers');

    } else if(body.status==='ZERO_RESULTS'){
      callback('bad address');
    } else if(body.status==='OK') {
      callback(undefined,{
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng

      });
      //  console.log('error:', error); // Print the error if one occurred
      // console.log(JSON.stringify(body,undefined,2)); // Print the contenmts recieved.
      // console.log( `Address: ${body.results[0].formatted_address}`);
      // console.log( `Latitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
  });
};

module.exports =  {
  geocodeAddress
};
