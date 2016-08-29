var keystone = require('keystone'),
	Post = keystone.list('Post'),
	Tournament = keystone.list('Tournament'),
	Event = keystone.list('Event'),
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

	view.query('annonces', Post.model.find()
		.where('state', 'published')
		.where('announce', true)
		.where('announceDeadLine').gte(today)
		.sort('-announceDeadLine'));


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

	// Sélection des 10 prochains évènements
	view.query('events', Event.model.find()
		.where('date').gte(today)
		.sort('date startHour')
		.limit(10));

	// Sélection du Media
	view.query('media', Media.model.findOne({type : mediaTypes.Home.value}));

	// Sélection des 3 derniers commentaires
	view.query('lastComments', PostComment.model.find()
		.where('commentState', 'published')
		.populate('author post')
		.sort('-publishedOn')
		.limit(3));

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
	};

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
	};

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
