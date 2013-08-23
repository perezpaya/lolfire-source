var async = require('async');
var counters;
module.exports.parseKills = function (data, cb){
	counters = {};

    async.map(data, function (stat, callback){

      switch(stat.object.statType){

        case 'TOTAL_NEUTRAL_MINIONS_KILLED':
          counters['neutral_minions'] = stat.object.value.value;
          break;
        case 'TOTAL_TURRETS_KILLED':
          counters['turret_kills'] = stat.object.value.value;
          break;
        case 'TOTAL_MINION_KILLS':
          counters['minion_kills'] = stat.object.value.value;
          break;
        case 'TOTAL_CHAMPION_KILLS':
          counters['champion_kills'] = stat.object.value.value;
          break;
        case 'TOTAL_ASSISTS':
          counters['assistances'] = stat.object.value.value;
          break;
        default:

      }

      callback(null);

    }, function (err){
    	cb(err, counters);
    });
};