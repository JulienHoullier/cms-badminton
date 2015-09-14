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

/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Accueil',		 key: 'home',		href: '/' },
		{ label: 'Le club',		 key: 'club',		href: '/club' },
		{ label: 'Inscriptions', key: 'subscribe',	href: '/inscriptions' },
		{ label: 'Actualités',	 key: 'blog',		href: '/blog' },
		{ label: 'Photos',		 key: 'gallery',	href: '/gallery' }
	];
	//add link to connected users
	if(req.user){
		locals.navLinks.push({ label: 'Joueurs',		key: 'player',		href: '/player' });
	}
	//Contact is the last link
	locals.navLinks.push({ label: 'Contact',		key: 'contact',		href: '/contact' });
		
	//store user to access it in the web page
	locals.user = req.user;
	
	next();
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
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
