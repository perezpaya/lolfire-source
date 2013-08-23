var request = require('request');

module.exports.getFreaturedMatches = function (region, callback){

	request.get({

	  url: 'http://spectator.eu.lol.riotgames.com:8088/observer-mode/rest/featured',
	  headers: {

	    'Cookie': 'mp_super_properties=%7B%22all%22%3A%20%7B%22%24initial_referrer%22%3A%20%22%22%2C%22%24initial_referring_domain%22%3A%20%22%22%2C%22distinct_id%22%3A%20%2236910949%22%7D%2C%22events%22%3A%20%7B%7D%2C%22funnels%22%3A%20%7B%7D%7D', 
	    'Referer': 'app:/LolClient.swf/[[DYNAMIC]]/5'

	  }

	}, function (err, res, body){

	  callback(err, JSON.parse(body));

	});

};