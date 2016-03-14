var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'gallery';

	locals.filters = {
		album: req.params.album
	};
	
	// Load the album
	view.query('album', keystone.list('Gallery').model.findOne({
			key: locals.filters.album,
		}).sort('-publishedDate'));
	
	
	
	// Render the view
	view.render('gallery/album');
	
};
