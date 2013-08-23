  var parser = require('../lib/parser');
  var async = require('async');

  module.exports.getSummonerStats = function (connection, id, callback){
    
    connection.getSummonerStats(id, function(err, result) {
                
      var matches = {};

      async.map(result.object.playerStatSummaries.object.playerStatSummarySet.data, function (data, callback){

        switch(data.object.playerStatSummaryTypeString){

          case 'Unranked':
            matches['5vs5'] = data.object;

            parser.parseKills(data.object.aggregatedStats.object.stats.data, function (err, stats){
              delete matches['5vs5'].aggregatedStats;
              matches['5vs5'].stats = stats;
            });

            break;

          case 'Unranked3x3':
            matches['3vs3'] = data.object;

            parser.parseKills(data.object.aggregatedStats.object.stats.data, function (err, stats){
              delete matches['3vs3'].aggregatedStats;
              matches['3vs3'].stats = stats;
            });

            break;

          case 'AramUnranked5x5':
            matches['ARAM'] = data.object;
            
            parser.parseKills(data.object.aggregatedStats.object.stats.data, function (err, stats){
              delete matches['ARAM'].aggregatedStats;
              matches['ARAM'].stats = stats;
            });
            
            break;

          case 'RankedSolo5x5':
            matches['Ranked Solo 5vs5'] = data.object;

            parser.parseKills(data.object.aggregatedStats.object.stats.data, function (err, stats){
              delete matches['Ranked Solo 5vs5'].aggregatedStats;
              matches['Ranked Solo 5vs5'].stats = stats;
            });

            break;

          case 'RankedTeam5x5':
            matches['Ranked Team 5vs5'] = data.object;

            parser.parseKills(data.object.aggregatedStats.object.stats.data, function (err, stats){
              delete matches['Ranked Team 5vs5'].aggregatedStats;
              matches['Ranked Team 5vs5'].stats = stats;
            });

            break;

          case 'RankedTeam3x3':
            matches['Ranked Team 3vs3'] = data.object;
            
            parser.parseKills(data.object.aggregatedStats.object.stats.data, function (err, stats){
              delete matches['Ranked Team 3vs3'].aggregatedStats;
              matches['Ranked Team 3vs3'].stats = stats;
            });

            break;
        }
        
        callback(err);
      
      }, function (err){
        callback(err, matches);
      });
    });
  };

  module.exports.getAggregatedStats = function (connection, id, callback){
    
    connection.getAggregatedStats(id, function (err, result){
      callback(err, result);
    });
  
  };