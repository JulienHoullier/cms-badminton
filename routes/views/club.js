var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	console.log("test");
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'club';

	// Render the view
	view.render('club');
	
};
