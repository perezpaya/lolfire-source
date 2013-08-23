
var Mixpanel = require('mixpanel');

var mixpanel = Mixpanel.init('yourapikey');


// Mixpanel Handlers

  global.trackApiRequest = function (req, res){
    
    mixpanel.track('api-req', {
      summoner: req.params.name || req.params.id,
      date: Date.now(),
      region: req.params.region,
      url: req.url
    });

  };

  global.trackErr = function (err){
    mixpanel.track('err', {
      err: err
    });
  };

  global.mixpanel = mixpanel;