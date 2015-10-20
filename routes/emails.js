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
			message: { md: 'Nice enquiry notification.' }
		});
		
		callback(null, {
			admin: 'Admin User',
			enquiry: newEnquiry,
			enquiry_url: '/keystone/enquiries/',
			mandrill:{}
		});
		
	},

	'tournament-notification': function(req, res, callback) {

		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.

		var Tournament = keystone.list('Tournament');

		var newSubscription = new Tournament.model({
			tournament: 'Saint Jacques le 07/11',
			category : 'Simple',
			player1: 'j.houllier@gmail.com',
			player1_licence : 06794300,
			player2: 'j.houllier@gmail.com',
			player2_licence : 06794315
		});

		callback(null, {
			subscription: newSubscription,
			mandrill:{}
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
			manager: 'Admin User',
			match: newMatch,
		});
	}
	
};
