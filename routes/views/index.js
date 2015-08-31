var keystone = require('keystone'),
	Post = keystone.list('Post'),
	ffbadnews = require('../../lib/ffbadnews');

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

    ffbadnews(function(err,data){
    	locals.news = data;
    });
	
	// Render the view
	view.render('index');
	
};
