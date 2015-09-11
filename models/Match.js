var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Match Model
 * =============
 */

var Match = new keystone.List('Match', {
	label: 'Rencontres'
});

Match.add({
	team: { type: Types.Relationship, ref: 'Team', required: true, initial: true, index: true },
    matchNumber: { type: Number, required: true, initial: true, index: true},
	versus: { type: Types.Text, required: true, initial: true, index: true },
	date: { type: Date },
    home: { type: Types.Select, options: 'Yes,No' },
	location: { type: Types.Location },
    result: { type: Types.LocalFile, dest: '/data/files' },
    occResult: { type: Number },
    versusResult: { type: Number },
    resultDetails: {
        sh1: {type: Types.Select, options: 'Win,Loose' },
        sh2: {type: Types.Select, options: 'Win,Loose' },
        sd1: {type: Types.Select, options: 'Win,Loose' },
        sd2: {type: Types.Select, options: 'Win,Loose' },
        dh: {type: Types.Select, options: 'Win,Loose' },
        dd: {type: Types.Select, options: 'Win,Loose' },
        dx1: {type: Types.Select, options: 'Win,Loose' },
        dx2: {type: Types.Select, options: 'Win,Loose' }
    }
});


/*
Match.schema.pre('save', function(next) {
	if (this.isModified('date')) {
		this.needNofif;
	}
});
*/

/*Match.schema.post('save', function() {
	if (this.needNotif) {
		this.sendNotificationEmail();
	}
});
*/

/*Match.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var Match = this;
	
	keystone.list('Team').model.findById(this.team).populate('players').exec(function(err, team) {
		
		if (err) return callback(err);
		
		console.log("will send mail to :"+team.players);
		new keystone.Email('Match-notification').send({
			to: team.players,
			from: {
				name: 'OCC-Badminton',
				email: 'contact@occ-badminton.com'
			},
			subject: 'Match de championnat - OCC-Badminton',
			Match: Match
		}, callback);
		
	});

};
*/
Match.defaultSort = '-matchNumber';
Match.defaultColumns = 'team, versus, date';
Match.register();
