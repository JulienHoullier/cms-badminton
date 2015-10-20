/**
 * This file defines the email tests for your project.
 * 
 * Each email test should provide the locals used to render the
 * email template for preview.
 * 
 * Values can either be an object (for simple tests), or a
 * function that calls a callback(err, locals).
 * 
 * Sample generated emails, based on the keys and methods below,
 * can be previewed at /keystone/test-email/{key}
 */

var keystone = require('keystone');

module.exports = {
	
	/** New Enquiry Notifications */
	
	'enquiry-notification': function(req, res, callback) {
		
		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.
		
		var Enquiry = keystone.list('Enquiry');
		
		var newEnquiry = new Enquiry.model({
			name: { first: 'Test', last: 'User' },
			email: 'contact@occ-badminton.com',
			phone: '+61 2 1234 5678',
			enquiryType: 'message',
			message: { md: 'Super message de test' }
		});
		
		callback(null, {
			admin: 'Admin User',
			enquiry: newEnquiry,
			enquiry_url: '/keystone/enquiries/',
			subject: 'Demande'
		});
		
	},

	'registration-notification': function(req, res, callback) {

		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.

		var Registration = keystone.list('Registration');

		var newRegistration = new Registration.model({
			tournament: 'Saint Jacques le 07/11',
			category : 'SH',
			player1: { first: 'Julien', last: 'Houllier' },
			player1_email: 'j.houllier@gmail.com',
			player1_licence : 06794300,
			level: 'R6/D7'
		});

		callback(null, {
			registration: newRegistration,
			subject: 'Inscription Tournoi'
		});
	},

	'match-notification': function(req, res, callback) {

		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.

		var Match = keystone.list('Match');

		var newMatch = new Match.model({
			versus: 'US Liffré D3',
			date: new Date()
		});

		callback(null, {
			match: newMatch,
			subject: 'Nouvelle journée'
		});
	},

	'post-notification': function(req, res, callback) {

		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.

		var Post = keystone.list('Post');

		var newPost = new Post.model({
			title: 'Test email Importante',
			content: {
				brief: 'Resume de la news',
				extended: 'Version longue de la news',
			},
			important: true
		});

		callback(null, {
			post: newPost,
			subject: 'News importante'
		});
	},

	'user-notification': function(req, res, callback) {

		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.

		var User = keystone.list('User');

		var newUser = new User.model({
			name: {first:' Julien', last:'Houllier'},
			email: 'j.houllier@gmail.com',
			password:'stes'
		});

		callback(null, {
			user: newUser,
			subject: 'Compte validé'
		});
	},

	'userAdmin-notification': function(req, res, callback) {

		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.

		var User = keystone.list('User');

		var newUser = new User.model({
			name: {first:' Julien', last:'Houllier'},
			email: 'j.houllier@gmail.com',
			password:'stes'
		});

		callback(null, {
			user: newUser,
			subject: 'Demande de création de compte'
		});
	}
	
	
};
