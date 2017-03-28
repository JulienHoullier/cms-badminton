// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var _ = require('underscore');

var nunjucks = require('nunjucks');
// Disable ninjuck's built-in template caching, express handles it
nunjucks.configure({autoescaping :true, noCache : true});
var dateFilter = require('nunjucks-date-filter');
dateFilter.install();
// Configuration des dates françaises.
var moment = require('moment');
moment.defineLocale('fr', require('./locales/fr'));

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': process.env.DB_NAME,
	'brand': process.env.BRAND,

	'less': 'frontend/public',
	'static': 'frontend/public',
	'favicon': 'frontend/public/favicon.ico',
	'views': 'frontend/templates/views',
	'view engine': 'swig',
	'custom engine': nunjucks.render,

	'emails': 'frontend/templates/emails',

	'cookie secret': process.env.COOKIE_SECRET,
	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',

	'signin logo': '/images/occ-logo.png'

});

keystone.init({
	'wysiwyg override toolbar': false,
	'wysiwyg menubar': true,
	'wysiwyg skin': 'lightgray',
	'wysiwyg additional buttons': 'searchreplace visualchars,'
	 + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
	 +' emoticons media, preview print ',
	'wysiwyg additional plugins': 'example, table, advlist, anchor,'
	 + ' autolink, autosave, bbcode, charmap, contextmenu, '
	 + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
	 + ' paste, preview, print, searchreplace, textcolor,'
	 + ' visualblocks, visualchars, wordcount'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('underscore'),
	moment: moment,
	env: process.env,
	utils: keystone.utils,
	editable: keystone.content.editable,
	brand: keystone.get('brand'),
	theme: {
		color: "#ded605"
	}
});

// Load your project's Routes
keystone.set('routes', require('./frontend/routes'));


// Setup common locals for your emails. 
keystone.set('email locals', {
	logo_src: '/images/occ-logo.png',
	logo_width: 100,
	logo_height: 76,
	theme: {
		color : "#ded605",
		email_bg: '#f9f9f9'
	}
});
// Setup mail options 
keystone.set('email options', {
	transport: 'mailgun',
	engine: keystone.get('custom engine'),
	root: 'frontend/templates/emails',
});

keystone.set('domain name', process.env.DOMAIN_NAME || 'http://localhost:3000');

// Configure the navigation bar in Keystone's Admin UI
var nav = {
	'Actualités': ['posts', 'post-categories', 'post-comments', 'events'],
	'Photos': 'galleries',
	'Demandes': 'enquiries',
	'Club': ['teams', 'players', 'matches'],
	'Utilisateurs': 'users',
	'Tournois': ['tournaments', 'registrations'],
	'Plan du site': ['pages', 'media', 'sponsors'],
	'Outils': ['mails']
};

keystone.post('signin', function (callback) {
	//user is passed as context
	if (!this.isValid) {
		return callback({message: 'Your account is not yet validated by an administrator'});
	}
	callback();
});


var filterNav = function(req) {
	var userNav = {};
	_.each(nav, function (section, key) {
		var addMenu = function (list) {
			var model = keystone.list(list);
			if (model.hasRoles(req.user)) {
				if (!userNav[key]) {
					userNav[key] = [];
				}
				userNav[key].push(list);
			}
		};

		if (section instanceof Array) {
			_.each(section, function (list) {
				addMenu(list);
			})
		}
		else {
			addMenu(section);
		}
	});
	return userNav;
};

/**
 * Middleware to check Model permission against logged user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var roleMiddleware = function (req, res, next) {
	var index = req.path.indexOf('/keystone');
	if (index != -1) {
		var userNav = filterNav(req);
		keystone.nav = keystone.initNav(userNav);
	}
	next();
};


//add middleware through keystone hook
keystone.pre('admin', roleMiddleware);

// Start Keystone to connect to your database and initialise the web server
keystone.start();
