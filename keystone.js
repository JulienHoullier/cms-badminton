// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
require('keystone-nodemailer');

var swig = require('swig');

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

	'wysiwyg images': true,

	'signin redirect' : '/'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

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

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
},
{
	find: '/#',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/#' : 'http://localhost:3000/#'
}]);

keystone.Email.defaults.templateExt =  'swig';
keystone.Email.defaults.templateEngine =  swig;
keystone.Email.defaults.mandrill =  {};

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'Actualités': ['posts', 'post-categories'],
	'Photos': 'galleries',
	'Demandes': 'enquiries',
	'Club': ['teams', 'players','matches'],
	'Utilisateurs': 'users',
    'Tournois' : ['tournaments', 'registrations']
});

keystone.post('signin', function (callback) {
	//user is passed as context
	if(!this.isValid){
		return callback({message: 'Your account is not yet validated by an administrator'});
	}
	callback();
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
