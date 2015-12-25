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

	var Page = keystone.list('Page');

	// Load current page
	view.query('page', Page.model.findOne({ slug: locals.filters.page }));

	// Render the view
	view.render('page');

};
