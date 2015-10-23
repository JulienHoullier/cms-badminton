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
	name: { type: Types.Text, required: true, initial: true },
	order: { type: Number, required: true, index:true, initial: true },
	captain: { type: Types.Relationship, ref: 'Player', required: true, initial: true }
});


/**
 * Relationships
 */

Team.relationship({ ref: 'Player', path: 'players', refPath: 'team' });

Team.schema.pre('save', function(next) {
	if(this.isNew){
		var team = this;
		
		var PostCategory = keystone.list('PostCategory');
		PostCategory.model.findOne({name : team.name}, function (err, category){
			console.log('category: ' + category);
			if(err){
				console.log(err);
			}
			else if(!category) {
				var category = new PostCategory.model({name :  team.name});
				console.log('category: ' + category);
				category.save();
			}
		});
	}
	next();
});

Team.defaultColumns = 'name, order, captain';
Team.register();
