var keystone = require('keystone'),
Team = keystone.list('Team'),
Match = keystone.list('Match'),
async = require('async');

exports = module.exports = function(req, res) {
    var locals = res.locals;
    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'results';
    var view = new keystone.View(req, res);

     view.on('init', function(next) {
        Team.model.find()
        .sort('name')
        .exec(function(err, teams) {
            if(err){
                local.teams = [];
                return next(err);
            }else{
                locals.teams = teams;
                locals.matches = [];
                async.each(locals.teams,function(team, next){
                    Match.model.find()
                    .where('team').in([team._id])
                    .sort('matchNumber')
                    .exec(function(err, matches) {
                        locals.matches[team._id] = matches;
                        next(err);
                    });
                }, function(err) {
                    next(err);
                });
            }
        });
    });
    
    view.on('render', function(next){

        // TODO
        // Transformer cette boucle en une requête mongoose
        // à voir avec la fonction aggregate
        // Permet de récupérer le dernier résultat de chaque équipe.
        locals.lastResults = [];
        for(team in locals.teams){
            var teamId = locals.teams[team]._id;
            var teamMatches = locals.matches[teamId];
            locals.lastResults[teamId] = [];
            if(teamMatches){
                for(var i=teamMatches.length-1; i>=0; i--){
                    if(teamMatches[i].occResult && teamMatches[i].versusResult){
                        locals.lastResults[teamId] = teamMatches[i];
                        break;
                    }
                }
            }
        }

        next();
    });

    view.render("resultat");
}