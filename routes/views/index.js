var keystone = require('keystone'),
	Post = keystone.list('Post'),
    Team = keystone.list('Team'),
    Match = keystone.list('Match'),
	ffbadnews = require('../../lib/ffbadnews'),
    async = require('async');


exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.query('lastPosts', Post.model.find()
    .where('state', 'published')
    .populate('author')
    .sort('-publishedAt')
    .limit(5));

    view.on('init', function(next) {
        Team.model.find()
        .sort('name')
        .exec(function(err, teams) {
            if(err){
                local.teams = [];
                return next(err);
            }else{
                locals.teams = teams;
                locals.matches = [];
                async.each(locals.teams,function(team, next){
                    keystone.list('Match').model.find()
                    .where('team').in([team._id])
                    .sort('matchNumber')
                    .exec(function(err, matches) {
                        locals.matches[team._id] = matches;
                        next(err);
                    });
                }, function(err) {
                    next(err);
                });
            }
        });
    });

    view.on('render', function(next){
        //console.log(res.locals.teams);
        //console.log(res.locals.matches);

    	var hasBeanCalled  = false;
    	ffbadnews(function(err,data){
    		if(err){
    			console.log(err);	
    			locals.ffbadNews = [];
    		}
    		else{
    			locals.ffbadNews = data;
    		}
 
    		if(!hasBeanCalled){
    			hasBeanCalled = true;
    			next();
    		}
    	});
    });

	
	// Render the view
    view.render('index');
};
