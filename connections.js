var lolrmtp = require('./lolrmtp/main').client;

// Connections to different regions

  global.connections = {};

  global.regions = {
    
    euw: {
      region: 'euw',
      username: 'lolfireeuw',
      password: 'password',
      version: '3.10.13_07_26_19_59'
    }/*, na: {
      region: 'na',
      username: 'lolfirena',
      password: 'password',
      version: '3.10.13_07_26_19_59'
    }, eune: {
      region: 'eune',
      username: 'lolfireeune',
      password: 'password',
      version: '3.10.13_07_26_19_59'
    }

  };*/


// Connects to each region in regions and handles reconnection

  async.map(Object.keys(regions), function (region, callback){

    connections[region] = new lolrmtp(regions[region]);

    connections[region].connect(function (err){
      if(err){
        console.log('Couldnt connect to ' + region);
        callback(err);
      }
    });

    connections[region].on('connection', function (){
      regions[region].connected = true;
      
      mixpanel.track('connection', {
        region: region,
        date: new Date()
      });
      
      // Handles reconnection and error supperponing connection

      // Why here? Cause it has to wait connection to listen on this stream events

      connections[region].stream.on('close', function (){

        regions[region].connected = false;

        mixpanel.track('disconnection', {
          region: region,
          date: new Date()
        });        

        connections[region].connect(function (err){

          regions[region].connected = true;

          mixpanel.track('reconnection', {
            region: region,
            date: new Date()
          });

          if(err){
            console.log('Couldnt reconnect to ' + region);
            callback(err);
          }

        });

      });

    });

  }, function (err){

    trackErr(err);

  });


	// Cron task that reconnects when all is down

	setInterval(function (){

	    async.map(Object.keys(regions), function (region, callback){
	      
	      if(regions[region].connected){
	        callback();
	      } else{
	        
	        connections[region].connect(function (err){

	          mixpanel.track('reconnection', {
	            region: region,
	            date: new Date()
	          });

	          if(err){
	            console.log('Couldnt reconnect to ' + region);
	            callback(err);
	          }

	        });

	      }

	    }, function (err){
	      
	      if(err){
	        trackErr(err);
	      }

	    });

	}, 5000);


