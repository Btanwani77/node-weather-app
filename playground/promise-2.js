const request  = require('request');

var geocodeAddress = (address) => {
  return new Promise( (resolve,reject) => {
    var encodedAddress = encodeURIComponent(address);
    console.log(encodedAddress);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json:true
    },(error, response, body) => {
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      if (error) {
        reject('unable to connect to Google Servers');

      } else if(body.status==='ZERO_RESULTS'){
        reject('bad address');
      } else if(body.status==='OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng

        });
      }
    });
  })
};

geocodeAddress('767001').then((locaion) => {
  console.log(JSON.stringify(locaion,undefined,2));
},(errorMessage) => {
  console.log(errorMessage);
});
