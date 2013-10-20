

  // Global modules

    global.async = require('async');

    require(__dirname + '/mixpanel');
    require(__dirname + '/connections');
  
  //var lolrmtp = require('./lolrmtp/main').client;

    var api = require(__dirname + '/api');

    var express = require('express');
  
  // Constructs modules

    global.app = express();

    var appRouter = require(__dirname + '/router');

  // Middlewares

    app.engine('ejs', require('ejs').__express);
    app.set('views', __dirname + '/views');
    app.use(express.compress());
    app.use(express.staticCache());
    app.use(express.static( __dirname + '/static'));
    //app.use('icons', express.static( __dirname + '/icons'));
    app.set('view engine', 'ejs');

    app.use(function (req, res, next){
      res.setHeader('Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    });

    app.use(app.router); // Always the last middleware


  // Full Regions Name

  global.fullRegions = {
    'euw': 'Europe West',
    'na': 'North America',
    'eune': 'Europe North & East'
    //'ru': 'Russia'
  };

  // Checks if server is connected to that region

    var regionChecker = function (req, res, next){
      if(regions[req.params.region] && regions[req.params.region].connected){
        next();
      } else{
        res.render('err.ejs');
      }
    };

    var regionCheckerApi = function (req, res, next){
      if(regions[req.params.region] && regions[req.params.region].connected){
        next();
      } else{
        res.send({err: 'Region down, come back later'});
      }
    };

  /*

      AAA    PPPPPP   III
    AA   AA  PP   PP  III
    AA   AA  PP   PP  III
    AAAAAAA  PPPPPP   III
    AA   AA  PP       III
    AA   AA  PP       III

    HERE GOES THE API HANDLING AND CODE


  */


  app.get('/api/v1/status', api.status);
  app.get('/api/v1/:region/summoner/:name', regionCheckerApi, api.summoner, trackApiRequest);
  app.get('/api/v1/:region/stats/:id', regionCheckerApi, api.stats, trackApiRequest);
  app.get('/api/v1/:region/aggregatedstats/:id', regionCheckerApi, api.aggregatedStats, trackApiRequest);
  app.get('/api/v1/:region/matches/:id', regionCheckerApi, api.matches, trackApiRequest);
  app.get('/api/v1/:region/teams/:id', regionCheckerApi, api.teams, trackApiRequest);
  app.get('/api/v1/:region/teamdata/:id', regionCheckerApi, api.teamInfo, trackApiRequest);
  app.get('/api/v1/:region/active/:name', regionCheckerApi, api.activeMatch, trackApiRequest);
  app.get('/api/v1/:region/summonerNames/:ids', regionCheckerApi, api.summonerNames, trackApiRequest);
  app.get('/api/v1/:region/leagues/:id', regionCheckerApi, api.leagues, trackApiRequest);


  // WEBAPP

    app.get('/', appRouter.index);
    app.get('/:region/summoner/:name', regionChecker, appRouter.summoner);
    app.get('/:region/summoner/:name/ranked', regionChecker, appRouter.ranked);
    app.get('/np', function (req, res){
      res.render('np.ejs');
    });

    app.get('/thanks', function (req, res){
      res.render('thx.ejs');
    });

    // This route goes in the last position, if any of the other routes have handle it, it will send 404 template

    app.get('*', function (req, res){
      res.render('404.ejs');
    });

  // Listens and creates the server

  app.listen(80);
