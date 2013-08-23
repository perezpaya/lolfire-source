var https = require('https');

module.exports = function (host, username, password, cb){
  var options = {
    host: host,
    port: 443,
    path: '/login-queue/rest/queue/authenticate',
    method: 'POST',
    rejectUnauthorized: false
  };

  // Performs a POST request to get login tokens for rmtp service

  var data = 'payload=user%3D'+username+'%2Cpassword%3D' + password;

  var req = https.request(options, function (res){
    res.on('data', function (d){
      console.log('Credentials: ', d.toString('utf-8'));
      d = JSON.parse(d.toString('utf-8'));
      cb(null, d);
    });
  });

  req.on('error', function (err){
    cb(err);
  });

  // Pushes the form
  req.write(data);

  req.end();

};


