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
	name: { type: Types.Text},
	captain: { type: Types.Relationship, ref: 'Player', required: true, initial: true },
	players: { type: Types.Relationship, ref: 'Player', many: true }
});


Team.defaultColumns = 'name, captain';
Team.register();
