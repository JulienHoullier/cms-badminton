var keystone = require('keystone');
var Registration = keystone.list('Registration');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.registrationSubmitted = false;
	
	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'subscribe' }, function(next) {
		
		var newRegistration = new Registration.model(),
			updater = newRegistration.getUpdateHandler(req);
		
		updater.process(req.body, {
			flashErrors: true,
			errorMessage: 'Il y a un problème avec votre demande d\'inscription:'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.registrationSubmitted = true;
			}
			next();
		});
		
	});
};
