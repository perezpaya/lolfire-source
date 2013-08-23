    var parser = require('./lib/parser');
    var handler = require('./lib/handler');

    var foo = {};

    foo.index = function (req, res){
  
      var supported = Object.keys(regions);

      async.map(supported, function (region, callback){
        if(regions[region].connected){
          callback(null, region);
        } else{
          callback();
        }
      }, function (err, online){
        res.render('index.ejs', {regions: supported, online: online, full: fullRegions});
      });

    };

    foo.summoner = function (req, res){

      async.waterfall([

        function (callback){

          connections[req.params.region].getSummonerByName(req.params.name, function(err, result) {
            callback(err, result);
          });

        }, function (result, callback){

          if(!result){

            callback(null);

          } else{

            handler.getSummonerStats(connections[req.params.region], result.object.acctId.value, function (err, stats){

              callback(err, stats, result);

            });

          }

        }

      ], function (err, stats, result){
        if(err){
          res.render('err.ejs', {err: err});
          trackErr(err);
        } else if(result){
          res.render('summoner.ejs', {stats: stats, summoner: result, name: req.params.name, region: fullRegions[req.params.region]});
        } else{
          res.render('404.ejs');
        }

      });

    };

    foo.ranked = function (req, res){

      async.waterfall([

        function (callback){

          connections[req.params.region].getSummonerByName(req.params.name, function(err, result) {
            callback(err, result);
          });

        }, function (result, callback){

          if(!result){

            callback(null);

          } else{

            handler.getAggregatedStats(connections[req.params.region], result.object.acctId.value, function (err, stats){

                callback(err, stats, result);

            });

          }

        }

      ], function (err, stats, result){
        if(err){
          res.render('err.ejs', {err: err});
          trackErr(err);
        } else if(result){
          //res.render('summoner.ejs', {stats: stats, summoner: result, name: req.params.name, region: fullRegions[req.params.region]});
          res.send(stats);
        } else{
          res.render('404.ejs');
        }

      });

    };

    module.exports = foo;