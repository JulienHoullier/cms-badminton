var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'player';
	
	// Load the galleries by sortOrder
	view.query('players', keystone.list('Player').model.find().sort('-name'));

	// Render the view
	view.render('player');
	
};
