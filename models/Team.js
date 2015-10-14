var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Team Model
 * =============
 */

var Team = new keystone.List('Team', {
	map: { name: 'name' },
	label: 'Equipes',
	drilldown: 'captain players'
});

Team.add({
	name: { type: Types.Text, label:'Nom', required: true, initial: true },
	order: { type: Number, label:'Ordre', required: true, index:true, initial: true },
	captain: { type: Types.Relationship, label:'Capitaine', ref: 'Player', required: true, initial: true }
});


/**
 * Relationships
 */

Team.relationship({ ref: 'Player', path: 'players', refPath: 'team', label:'Joueurs' });

Team.schema.pre('save', function(next) {
	if(this.isNew){
		var team = this;
		
		var PostCategory = keystone.list('PostCategory');
		PostCategory.model.findOne({name : team.name}, function (err, category){
			if(err){
				console.log(err);
			}
			else if(!category) {
				console.log('category: ' + category);
				category.save();
			}
		});
	}
	next();
});

Team.defaultColumns = 'name, order, captain';
Team.register();
