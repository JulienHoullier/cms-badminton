var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		categories: []
	};
	

	var PostCategory = keystone.list('PostCategory');
	var Post = keystone.list('Post');
	var PostComment = keystone.list('PostComment');

	// Load all categories
	view.on('init', function(next) {
		
		PostCategory.model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.categories = results;
			
			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
				
				Post.model.count().where('category').in([category.id]).exec(function(err, count) {
					category.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
			PostCategory.model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	var addNbComments = function (article, next){
		article.nbComment = 0;
		PostComment.model.count()
			.where('post', article)
			.where('commentState', 'published')
			.where('author').ne(null).exec(function(err, count){
				if(!err && count){
					article.nbComment = count;
				}
				next();
			});
	}

	// Load the posts
	view.on('init', function(next) {
		
		var q = Post.paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author category');
		
		if (locals.data.category) {
			q.where('category').in([locals.data.category]);
		}
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			
			if(results){
				async.each(results.results, function(article, callback){
					addNbComments(article, callback);
				}, function(err){
					if(err) {
						return console.log(err);
					}
					next();
				})
			}
			else
				next();
		});
	});

	// Render the view
	view.render('blog');
	
};
