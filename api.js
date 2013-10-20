  
  // Checks if API is online


  // Starts API handling

  var api = {};

  api.status = function (req, res){

    var supported = Object.keys(regions);

    async.map(supported, function (region, callback){
      if(regions[region].connected){
        callback(null, region);
      } else{
        callback();
      }
    }, function (err, online){
      res.send({supportedRegions: supported, online: online});
    });

  };

  api.summoner = function (req, res, next){

    connections[req.params.region].getSummonerByName(req.params.name, function(err, result) {
      if(err){
        res.send({err: err});
        trackErr(err);
      } else{
        res.send(result || {});

        mixpanel.people.set(req.params.region + '-' + result.object.acctId.value, {
          "name": req.params.name,
          "region": req.params.region
        });

        mixpanel.people.increment(req.params.region + '-' + result.object.acctId.value, 'times_searched');

      }

      next();

    });

  };

  api.summonerNames = function (req, res, next){
    var ids = req.params.ids.trim().split(',').map(function (a) {return parseInt(a, 10);});
    connections[req.params.region].getSummonerNames(ids, function(err, result) {
      if(err){
        res.send({err: err});
        trackErr(err);
      } else{
        res.send(result || {});
      }

      next();

    });

  };

  api.stats = function (req, res, next){

    connections[req.params.region].getSummonerStats(req.params.id, function(err, result) {
      if(err){
        res.send({err: err});
        trackErr(err);
      } else{
        res.send(result || {});
        mixpanel.people.increment(req.params.region + '-' + req.params.id, 'times_searched');
      }

      next();

    });

  };

  api.aggregatedStats = function (req, res, next){

    connections[req.params.region].getAggregatedStats(req.params.id, function(err, result) {
      if(err){
        res.send({err: err});
        trackErr(err);
      } else{
        res.send(result || {});
        mixpanel.people.increment(req.params.region + '-' + req.params.id, 'times_searched');
      }

      next();

    });

  };

  api.matches = function (req, res, next){

    connections[req.params.region].getMatchHistory(req.params.id, function(err, result) {
      if(err){
        res.send({err: err});
        trackErr(err);
      } else{
        res.send(result || {});
        mixpanel.people.increment(req.params.region + '-' + req.params.id, 'times_searched');
      }

      next();

    });

  };

  api.teams = function (req, res, next){

    connections[req.params.region].getTeamsForSummoner(req.params.id, function(err, result) {
      if(err){
        res.send({err: err});
        trackErr(err);
      } else{
        res.send(result || {});
      }

      next();

    });

  };  

  api.teamInfo = function (req, res, next){

    connections[req.params.region].getTeamById(req.params.id, function(err, result) {
      if(err){
        res.send({err: err});
        trackErr(err);
      } else{
        res.send(result || {});
      }

      next();

    });

  };

  api.activeMatch = function (req, res, next){
      
    var client = connections[req.params.region];

    client.getInProgressMatch(req.params.name, function(err, result) {
      if(err){
        res.send({err: err});
      } else{
        res.send(result || {});
      }
    });

  };

  api.leagues = function (req, res, next){
      
    var client = connections[req.params.region];

    client.getAllLeaguesForPlayer(req.params.id, function(err, result) {
      if(err){
        res.send({err: err});
      } else{
        res.send(result || {});
      }
    });

  };

  module.exports = api;