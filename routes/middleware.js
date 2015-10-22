/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');
var keystone = require('keystone');
var Sponsor = keystone.list('Sponsor');
var Page = keystone.list('Page');

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{
			label: 'Accueil',
			 key: 'home',
			 href: '/'
		},
		{
			label: 'Actualités',
			key: 'blog',
			href: '/blog'
		},
		{
			label: 'Photos',
			key: 'gallery',
			href: '/gallery'
		}

	];

	//add link to connected users
	if(req.user && req.user.isValid){
		locals.navLinks.push({
			label: 'Joueurs',
			key: 'player',
			href: '/player'
		});
	}

	//store user to access it in the web page
	locals.user = req.user;

	Page.model.find().where('state', 'show').exec(function(err, results) {
		if(results){

			var divers;
			results.forEach(function(result){
				var pageArray;
				if(locals.navLinks.length < 8){
					pageArray = locals.navLinks;
				} else{
					if(!divers){
						divers = {
							label: 'Divers',
							key: 'divers',
							pages : []
						}
					}
					pageArray = divers.pages;
				}

				pageArray.push(
					{
						label: result.title,
						key: result.slug,
						href: result.url
					});
			});
		}

		//Contact is the last link
		locals.navLinks.push({
			label: 'Contact',
			key: 'contact',
			href: '/contact'
		});

		next(err);
	});
};


/**
	Initialises the sponsors list
	
	The included layout depends on the sponsors array to generate
	the horizontal list
*/
exports.initSponsors = function(req, res, next) {
	
	var locals = res.locals;
	
	Sponsor.model.find().exec(function(err, results) {
		locals.sponsors = results;
		next(err);
	});
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next(); 
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Connectez-vous pour accéder à cet page');
		res.redirect('/keystone/signin');
	} else {
		if(!req.user.isValid){
			req.flash('warn', 'Votre compte n\'est pas encore validé');
			res.redirect('/');
		}
		else{
			next();
		}
	}
};
