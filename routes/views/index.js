var keystone = require('keystone'),
	Post = keystone.list('Post'),
	ffbadnews = require('../../lib/ffbadnews');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	

	view.query('articles', Post.model.find()
    .where('state', 'published')
    .populate('author')
    .populate('categories')
    .sort('-publishedDate')
    .limit(4));



    // view.on('render', function(next){
    	
    // 	var hasBeanCalled  = false;
    // 	ffbadnews(function(err,data){
    // 		if(err){
    // 			console.log(err);	
    // 			locals.ffbadNews = [];
    // 		}
    // 		else{
    // 			locals.ffbadNews = data;
    // 		}
 
    // 		if(!hasBeanCalled){
    // 			hasBeanCalled = true;
    // 			next();
    // 		}
    // 	});
    // });
	
	// Render the view
	view.render('newIndex');
	
};
