// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
require('keystone-nodemailer');
var _ = require('underscore');

var swig = require('swig');
var moment = require('moment');

// Disable swig's bulit-in template caching, express handles it
swig.setDefaults({ cache: false });

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'OCC-Badminton',
	'brand': 'OCC-Badminton',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'swig',

	'custom engine': swig.renderFile,

	'emails': 'templates/emails',

	'cookie secret': process.env.COOKIE_SECRET,
	'auto update': true,
	'session': true,
	'session store': 'mongo',
	'auth': true,
	'user model': 'User',

	'wysiwyg images':true,
	'wysiwyg cloudinary images': true,

	'signin redirect' : '/',
	'signin logo' : '/images/occ-logo.png'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	moment: moment,
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

moment.defineLocale('fr', {
    months : "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split("_"),
    monthsShort : "Janv_Fév_Mars_Avril_Mai_Juin_Juil_Août_Sept_Oct_Nov_Déc".split("_"),
    weekdays : "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),
    weekdaysShort : "Dim._Lun._Mar._Mer._Jeu._Ven._Sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        LTS : "HH:mm:ss",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "dans %s",
        past : "il y a %s",
        s : "quelques secondes",
        m : "une minute",
        mm : "%d minutes",
        h : "une heure",
        hh : "%d heures",
        d : "un jour",
        dd : "%d jours",
        M : "un mois",
        MM : "%d mois",
        y : "une année",
        yy : "%d années"
    },
    ordinalParse : /\d{1,2}(er|ème)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'ème');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'M';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

console.log(moment.locale());

// Load your project's Routes
keystone.set('routes', require('./routes'));

//prepare nodemailer config

keystone.set('email nodemailer' , {
host: process.env.MAIL_HOST,
	port : 587,
	auth: {
	user: process.env.MAIL_USR,
	pass: process.env.MAIL_PWD
},
authMethod : 'PLAIN'
});

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/occ-logo.png',
	logo_width: 100,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		email_header_bg: '#BF1E2D',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	},
	mandrill: {}
});


keystone.set('domain name',  process.env.DOMAIN_NAME || 'http://localhost:3000');

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace:  keystone.get('domain name')+'/images/'
}, {
	find: '/keystone/',
	replace: keystone.get('domain name')+'/keystone/'
},
{
	find: '/#/',
	replace: keystone.get('domain name')+'/'
}]);

keystone.Email.defaults.templateExt =  'swig';
keystone.Email.defaults.templateEngine =  swig;
keystone.Email.defaults.mandrill =  {};

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

var nav= {
	'Actualités': ['posts', 'post-categories', 'post-comments', 'events'],
	'Photos': 'galleries',
	'Demandes': 'enquiries',
	'Club': ['teams', 'players','matches'],
	'Utilisateurs': 'users',
    'Tournois' : ['tournaments', 'registrations'],
    'Plan du site' : ['pages', 'media', 'sponsors'],
	'Outils': ['mails']
};

keystone.set('nav', nav);

keystone.post('signin', function (callback) {
	//user is passed as context
	if(!this.isValid){
		return callback({message: 'Your account is not yet validated by an administrator'});
	}
	callback();
});

//save keystone.render function
var oldRender = keystone.render;
keystone.render = function(req, res, view, ext){
	var userNav = {};
	/**
	 * Override keystone render to generate menu depending user's roles
	 * @param req
	 * @param res
	 * @param view
	 * @param ext
	 */
	var extString = function(ext){
		var cache = [];
		var temp = JSON.stringify(ext, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		});
		cache = null; // Enable garbage collection
		return temp;
	};

	var s = extString(ext).toString();
	console.log('ext before: '+s);

	_.each(nav, function(section, key){
		var addMenu = function(list){
			var model = keystone.list(list);
			if (model.hasRoles(req.user)) {
				if (!userNav[key]) {
					userNav[key] = [];
				}
				userNav[key].push(list);
			}
		};

		if(section instanceof Array) {
			_.each(section, function (list) {
				addMenu(list);
			})
		}
		else{
			addMenu(section);
		}
	});

	var locals = { nav : keystone.initNav(userNav)};
	_.extend(ext, locals);

	s = extString(ext).toString();
	console.log('ext after: '+s);
	//call keystone render
	oldRender.call(keystone, req, res, view, ext);
};

/**
 * Middleware to check Model permission against logged user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var roleMiddleware = function(req, res, next) {
	var index = req.path.indexOf('/keystone/');
	if(index != -1) {
		var model = req.path.substring(index + 10);
		if(model !== 'signin' && model !== 'signout') {
			index = model.indexOf('/');
			if (model.length > 0 && index == -1) {
				//try to access a model
				var List = keystone.list(model);
				if (List && List['hasRoles'] && !List.hasRoles(req.user)) {
					req.flash('error', "Vous n'avez pas les droits pour accéder à cette page");
					return res.redirect('/keystone/');
				}
			}
		}
	}
	next();
};
//add middleware through keystone hook
keystone.set('pre:routes', function(app){
	app.all('/keystone*', roleMiddleware);
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();
