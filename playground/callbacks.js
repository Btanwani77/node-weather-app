
// call back example
var getUser = (id,callback) => {
// this object user is fetched from some db or file here we declared as dummy
  var user = {
    id:id,
    name:'vikram'
  };
  setTimeout(() => {
    callback(user);

  },3000)
};

getUser(31,(userObject) => {
  console.log(userObject);
});
// https://maps.googleapis.com/maps/api/geocode/json?address=railway%20station%20balangir
