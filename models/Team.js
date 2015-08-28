var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Team Model
 * =============
 */

var Team = new keystone.List('Team', {
	map: { name: 'number' },
	drilldown: 'captain'
});

Team.add({
	order: { type: Number, required: true, initial: true },
	captain: { type: Types.Relationship, ref: 'Player', required: true, initial: true },
	name: { type: Types.Text },
	players: { type: Types.Relationship, ref: 'Player', many: true }
});

Team.defaultColumns = 'order, name, captain';
Team.register();
