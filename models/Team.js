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
	order: { type: Number, required: true, index:true, initial: true },
	captain: { type: Types.Relationship, ref: 'Player', required: true, initial: true },
	name: { type: Types.Text, required: true, initial: true },
	players: { type: Types.Relationship, ref: 'Player', many: true }
});

Team.defaultColumns = 'name, order, captain';
Team.register();
