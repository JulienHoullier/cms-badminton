var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Player Model
 * =============
 */

var Player = new keystone.List('Player', {
	map: { name: 'name' },
	label: 'Joueurs',
	autokey: { path: 'slug', from: 'email', unique: true }
});

Player.add({
	name: { type: Types.Name, label:'Nom', required: true },
	email: { type: Types.Email, label:'Email', required: true, initial: true },
	phone: { type: String , label:'Téléphone'},
	licence: {type: Number , label:'N° Licence'},
	type: { type: Types.Select, label:'Type', options: [
		{ value: 'competitor', label: 'Licence compétition' },
		{ value: 'leisure', label: 'Licence loisir' },
		{ value: 'young', label: 'Jeune' }
	], default: 'leisure' },
	state: { type: Types.Select, label:'Etat', options: [
		{ value: 'new', label: 'Pré-inscrit' },
		{ value: 'confirmed', label: 'Inscription complétée' },
		{ value: 'aborted', label: 'Inscription annulée' }
	], default: 'new' },
	timeSlot: { type: Types.Select, label:'Horaire', options: [
		{ value: 'monday_middle', label: 'Lundi intermédiaire 19h/20h30' },
		{ value: 'monday_newbie', label: 'Lundi débutant  20h30/22h' },
		{ value: 'wednesday_strong', label: 'Mercredi confirmé 20h30/22h' },
		{ value: 'friday_middle', label: 'Vendredi intermédiaire 20h/21h30' },
	], required: true, initial: true },
	team: { type: Types.Relationship, label:'Equipe', ref: 'Team', index: true },
	interests : { type: Types.Relationship, label:'Libellés', ref: 'PostCategory', many:true }
});

//add club interest 
Player.schema.pre('save', function(next) {

	if(!this.isNew){
		return next();
	}
	var player = this;
	var PostCategory = keystone.list('PostCategory');
	PostCategory.model.findOne({name : 'Club'}, function (err, category){
		if(err){
			console.log(err);
		}
		if(category){
			console.log('category on new');
			player.interests = [category];
		}
		next();
	});
});

//add competitor interest 
Player.schema.pre('save', function(next) {

	if(!this.type === 'competitor'){
		return next();
	}

	var player = this;
	//Add category of team name if exists and not present
	addCategoryIfNotPresent(player, 'Compétiteur', next);
});
	
//add current team interest
Player.schema.pre('save', function(next) {
	if(!this.team || (!this.isNew && (!this.isModified('team') || this.isModified('interests')))) {
		return next();
	}
	var player = this;
	var Team = keystone.list('Team');
	//find team by its id to get name
	Team.model.findById(this.team).exec(function(err, team){
		if(err){
			console.log(err);
			return next();
		}
		if(team){
			//Add category of team name if exists and not present
			addCategoryIfNotPresent(player, team.name, next);
		}
		else{
			return next();
		}
	});	
});

var addCategoryIfNotPresent = function(player, categoryName, next){
	var PostCategory = keystone.list('PostCategory');
	PostCategory.model.findOne({name : categoryName}, function (err, category){
		if(err){
			console.log(err);
		}
		if(category) {
			//add category if not present
			var interests = player.interests ? player.interests : new Array();
			console.log('interests: '+interests);
			if (interests.indexOf(category.name) == -1) {
				interests.push(category);
				player.interests = interests;
			}
		}
		return next();
	});
};

Player.defaultColumns = 'name, email, type, state, team';
Player.register();
