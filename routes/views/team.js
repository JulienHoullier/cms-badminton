var keystone = require('keystone');
var async = require('async');
var classement = require('../../lib/classement');

exports = module.exports = function(req, res) {
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'team';
	var Team = keystone.list('Team');
    var view = new keystone.View(req, res);

	view.query('teams',Team.model.find().sort('name')).then('players');
	view.on('render', function(next){
		async.each(locals.teams, function(team, callback){
			async.each(team.players, function(player, playerCallback){
				classement(player.licence, function(err, data){
					if(!err && data && data.length == 3){
						player.ranking = data[0] + " / " + data[1] + " / " + data[2];
					}
					playerCallback(err);
				});
			}, function(err){callback(err);})
		}, function(err){next(err);});
	});

    view.render("team");
};
