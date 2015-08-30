var keystone = require('keystone');
var ffbadnews = require('./ffbadnews');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	var newsClub = [{title:"News 1", content:"Superbe News 1"}];
	var newsEquipes = [
	{title:"News Equipe 1", content:"Superbe News Equipe 1"},
	{title:"News Equipe 2", content:"Superbe News Equipe 2"}

	];

	var newsFFBAD = ffbadnews.fetch();

	locals.news = {
		newsClub : newsClub,
	 	newsEquipes:newsEquipes, 
	 	newsFFBAD:newsFFBAD
	 };
	// Render the view
	view.render('index');
	
};
