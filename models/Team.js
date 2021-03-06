var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Team Model
 * =============
 */

var Team = new keystone.List('Team', {
	map: { name: 'name' },
	label: 'Equipes',
	drilldown: 'captain'
});

Team.add({
	name: { type: Types.Text, label:'Nom', required: true, initial: true },
	order: { type: Number, label:'Ordre', required: true, index:true, initial: true },
	captain: { type: Types.Relationship, label:'Capitaine', ref: 'Player', required: true, initial: true }
});

Team.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
};

/**
 * Relationships
 */

Team.relationship({ ref: 'Player', path: 'players', refPath: 'team', label:'Joueurs' });

Team.schema.pre('save', function(next) {
	if(this.isNew){
		var team = this;
		var PostCategory = keystone.list('PostCategory');
		findCategory(team, function(err, category){
			if(err){
				console.log(err);
			}
			else if(!category) {
				category = new PostCategory.model({name: team.name});
				category.save();
			}
			next();
		});
		this.wasNew = true;
	}
	else {
		next();
	}

});

Team.schema.post('save', function() {
	if(this.wasNew) {
		var team = this;
		
		var Player = keystone.list('Player');
		Player.model.findById(this.captain).populate('interests').exec(function(err, captain){
			if(err){
				return console.log(err);
			}
			captain.team = team;
			captain.save();
		});
	}
});

var findCategory = function(team, callback){
	var PostCategory = keystone.list('PostCategory');
	PostCategory.model.findOne({name : team.name}, function (err, category){
		if(err){
			callback(err, category);
		}
		callback(null, category);
	});
};

Team.defaultColumns = 'name, order, captain';
Team.register();
