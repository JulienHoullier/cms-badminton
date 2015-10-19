var keystone = require('keystone'),
	Post = keystone.list('Post'),
	Match = keystone.list('Match');
	//ffbadnews = require('../../lib/ffbadnews'),

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.query('articles', Post.model.find()
		.where('state', 'published')
		.populate('author')
		.populate('categories')
		.sort('-publishedDate')
		.limit(4));

	view.query('lastResults', Match.model.find()
		.populate('team')
		.sort('-date')
		.limit(6));

	// Render the view
	view.render('newIndex');
};
