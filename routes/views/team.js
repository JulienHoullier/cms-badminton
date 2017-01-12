var keystone = require('keystone');

exports = module.exports = function(req, res) {
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'team';
	var Team = keystone.list('Team');
    var view = new keystone.View(req, res);

     view.on('init', function(next) {
        Team.model.find()
        .sort('name')
        .exec(function(err, teams) {
            if(err){
                local.teams = [];
                return next(err);
            }else{
                locals.teams = teams;
            }
        });
    });

    view.render("team");
};