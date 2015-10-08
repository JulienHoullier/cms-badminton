var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.filters = {
		page: req.params.page
	};
	
	locals.section = locals.filters.page;
	
	// Load current page
	view.on('init', function(next) {
		
		keystone.list('Page').model.findOne({ slug: locals.filters.page }).exec(function(err, result) {
				locals.page = result;
				next(err);
			});
	});
	
	// Render the view
	view.render('page');
	
};
