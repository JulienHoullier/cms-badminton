var keystone = require('keystone'),
	Post = keystone.list('Post'),
	Tournament = keystone.list('Tournament'),
	Match = keystone.list('Match'),
	async = require('async'),
	Media = keystone.list('Media'),
	mediaTypes = require('../../lib/MediaType'),
 	PostComment = keystone.list('PostComment');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var today = new Date();

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.query('articles', Post.model.find()
		.where('state', 'published')
		.populate('author')
		.populate('category')
		.sort('-publishedDate')
		.limit(4));

	// Sélection des 6 derniers matchs, toutes équipes confondues
	view.query('lastResults', Match.model.find()
		.where('date').lt(today)
		.populate('team')
		.sort('-date')
		.limit(6));

	// Sélection des 5 prochains tournois
	view.query('tournaments', Tournament.model.find()
		.where('date').gte(today)
		.sort('date')
		.limit(5))
		.then('registrations');

	// Sélection du Media
	view.query('media', Media.model.findOne({type : mediaTypes.Home.value}));


	var countNbInscrit = function (tournament, next){
		var nbInscrit = 0;
		if(tournament.registrations){
			async.each(tournament.registrations, function (registration, next){
				nbInscrit += (registration.player2 != null) ? 2 : 1;
				next();
			},
			function (err){
				tournament.nbInscrit = nbInscrit;
				next(err);
			});
		}
	}

	var addNbComments = function (article, next){
		article.nbComment = 0;
		PostComment.model.count()
			.where('post', article)
			.where('commentState', 'published')
			.where('author').ne(null).exec(function(err, count){
				if(!err && count){
					article.nbComment = count;
				}
				next();
			});
	}

	view.on('render', function(next){
		async.parallel([
			function(callback){async.each(locals.tournaments, countNbInscrit, function(err){callback(err)});},
			function(callback){async.each(locals.articles, addNbComments, function(err){callback(err)});}
		], function(err){
			if(err) {
				return console.log(err);
			}
			next();});
	});
	
	// Render the view
	view.render('newIndex');
};
