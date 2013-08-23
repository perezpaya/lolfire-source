
  var async = require('async');

  var LolClient = require('./lol-client');

  util = require('util');

  options = {
    region: 'euw',
    username: 'NSZombie',
    password: 'alex28660',
    version: '3.10.13_07_01_27',
    debug: true
  };

  var client = new LolClient(options);

  client.on('disconnection', function (){
    client.connect();
  });

  client.on('connection', function() {
    console.log('Connected');

    async.waterfall([

      function (callback){

        client.getInProgressMatch('mrpalo', function(err, result) {
          callback(err, result);
        });

      }

    ], function (err, result){

      console.log(err, result);

    });

// You can do parallel requests.

/*    async.parallel([

      function (callback){
        client.getSummonerStats(36910949, function(err, result) {
          console.log(1);
          callback(err, result);
        });
      }, function (callback){

        client.getSummonerByName('Ichiriki Orihara', function(err, result) {
          console.log(2);
          callback(err, result);
        });

      }

    ], function (err, result){
      console.dir(err, result);
    });*/
    
/*  client.getSummonerStats(summoner.summonerId, function(err, result) {
      return console.log(util.inspect(result, false, null, true));
    });*/
    /*client.getMatchHistory(summoner.acctId, function(err, result) {
      return console.log(util.inspect(result, false, null, true));
    });
    client.getAggregatedStats(summoner.acctId, function(err, result) {
      return console.log(util.inspect(result, false, null, true));
    });
    client.getTeamsForSummoner(summoner.summonerId, function(err, result) {
      return console.log(util.inspect(result, false, null, true));
    });
    client.getTeamById(summoner.teamId, function(err, result) {
      return console.log(util.inspect(result, false, null, true));
    });
    return client.getSummonerData(summoner.acctId, function(err, result) {
      return console.log(util.inspect(result, false, null, true));
    });*/
  
  });

  client.connect();
