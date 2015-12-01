var keystone = require('keystone');
var User = keystone.list('User');


exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.on('post', function(next) {
		if(keystone.security.csrf.validate(req)){
			User.model.find().where('email',req.body.email).exec(function(err, result) {
				if(result.length > 0){
					req.flash('error', "L'email est déjà utilisé.");
					res.redirect('/account');
				} else {
					var newUser = new User.model();
			        var updater = newUser.getUpdateHandler(req);
			        updater.process(req.body, {
			            flashErrors: true,
			            fields: 'name, email, password',
			            errorMessage: "Erreur lors de l'inscription"
			        }, function(err) {
			            if (err) {
			                locals.validationErrors = err.errors;
			                keystone.security.csrf.getToken(req,res);
			                next();
			            } else {
			                req.flash('success', "Votre inscription a bien été prise en compte et est en attente de confirmation !");
			    			res.redirect('/');
			            }
			        });
				}
			});
		} else {
			req.flash('error', "Requête non autorisée.");
			keystone.security.csrf.getToken(req,res);
			next();
		}
    });

	// Render the view
	view.render('account');

};
