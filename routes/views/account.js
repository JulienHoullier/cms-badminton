var keystone = require('keystone');
var User = keystone.list('User');


exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.on('post', function(next) {
        var newUser = new User.model();
        var updater = newUser.getUpdateHandler(req);

        updater.process(req.body, {
            flashErrors: true,
            fields: 'name, email, password',
            logErrors: true,
            errorMessage: "Problème lors de l'inscription..."
        }, function(err) {
            if (err) {
                locals.validationErrors = err.errors;
                next();
            } else {
                req.flash('success', "Votre inscription a bien été prise en compte et est en attente de confirmation !");
    			res.redirect('/');
            }
        });
    });

	// Render the view
	view.render('account');

};
