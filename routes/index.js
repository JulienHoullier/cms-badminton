/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.initSponsors);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	feeds: importRoutes('./feeds'),
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/pages/:page', routes.views.page);
	app.get('/gallery', routes.views.gallery);

	// Tournois
	app.get('/tournois', routes.views.tournoi.tournois);
	app.all('/tournois/:idTournoi/inscription', middleware.requireUser, routes.views.tournoi.inscription);

	app.get('/player', routes.views.player);
	app.get('/resultats', routes.views.resultat);
	app.all('/contact', routes.views.contact);
	app.all('/account', keystone.security.csrf.middleware.init, routes.views.account);

	// Feeds
	app.get('/feed', middleware.feedResponse, routes.feeds.feed);
	
};
