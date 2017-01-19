var keystone = require('keystone');
var Types = keystone.Field.Types;
var utils = keystone.utils;

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
    sex: {type: Types.Select , label:'Sexe',  options: [
        { value: 'h', label: 'Homme' },
        { value: 'f', label: 'Femme' }
        ], default: 'h'},
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
	timeSlot: { type: Types.Relationship, label:'Créneau', ref: 'Timeslot', initial: true, many:true },
	team: { type: Types.Relationship, label:'Equipe', ref: 'Team', index: true },
	interests : { type: Types.Relationship, label:'Libellés', ref: 'PostCategory', many:true }
});

Player.hasRoles = function(user){
	if(user) {
		return user.isAdmin;
	}
	return false;
};

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
			player.interests = [category];
		}
		next();
	});
});

//add competitor interest 
Player.schema.pre('save', function(next) {
	//force Compétiteur only if not editing interests
	if(this.type !== 'competitor' || (!this.isNew && !this.ignoreInterestsModified && this.isModified('interests'))){
		return next();
	}

	var player = this;
	//Add category of team name if exists and not present
	addCategoryIfNotPresent(player, 'Compétiteur', next);
});
	
//add current team interest
Player.schema.pre('save', function(next) {
	//force Team category only if not editing interests and a team if present
	if(!this.team || (!this.isNew && !this.ignoreInterestsModified && this.isModified('interests'))) {
		return next();
	}
	
	var player = this;
	var Team = keystone.list('Team');
	//find team by its id to get name
	Team.model.findById(this.team).exec(function(err, team){
		if(err){
			console.log(err);
			return next(err);
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

//add current timeSlot interest
Player.schema.pre('save', function(next) {
	//force Team category only if not editing interests and a team if present
	if(!this.timeSlot || (!this.isNew && !this.ignoreInterestsModified && this.isModified('interests'))) {
		return next();
	}
	
	var player = this;
	var Timeslot = keystone.list('Timeslot');
	//find team by its id to get name
	Timeslot.model.findById(this.timeSlot).exec(function(err, timeSlot){
		if(err){
			console.log(err);
			return next(err);
		}
		if(timeSlot){
			//Add category of team name if exists and not present
			addCategoryIfNotPresent(player, timeSlot.fullName, next);
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
			return next(err);
		}
		if(category) {
			player.populate('interests', function(err, player) {
				if(err){
					console.log(err);
					return next(err);
				}
				//add category if not present
				var interests = player.interests ? player.interests : [];
				
				if (!categoryAlreadyPresent(category.name, interests)) {
					interests.push(category);
					player.interests = interests;
					player.ignoreInterestsModified = true;
				}

				return next();
			});
		}
		else{
			return next();
		}
		
	});
};

var categoryAlreadyPresent = function(categoryName, interests){
	if(utils.isObject(interests)){
		return interests.name === categoryName;
	}
	if(utils.isArray(interests)){
		var exists = false;
		for(var i = 0; (i<interests.length && !exists); i++){
			if(interests[i].name === categoryName){
				exists = true;
			}
		}
		return exists;
	}
	return false;
};

Player.defaultColumns = 'name, email, type, state, team';
Player.register();
