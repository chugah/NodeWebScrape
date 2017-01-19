const mongoose = require('mongoose'); 
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
	var james, blogPost, comment;

	beforeEach((done) => {
		james = new User({ 
			first_name: 'James', 
			last_name: 'Joyce' 
		});
		blogPost = new BlogPost({
			title: 'Ulysees',
			content: 'A modernist novel that parallels the epic poem Odyssey'
		});
		comment =  new Comment({
			content: 'This novel is one of the most important works of modernist literature'
		});
		
		james.blogPosts.push(blogPost); 
		blogPost.comments.push(comment);
		comment.user = james;

		Promise.all([
			james.save(),
			blogPost.save(),
			comment.save()
		])
		.then(() => done());
	});

	it('should create a relationship between user and blogpost', (done) => {
		User.findOne({ name: 'James' })
			.populate('blogPosts')
			.then((user) => {
				assert(user.blogPosts[0].title === 'Ulysees');		
		});	
		done();	
	});

	it('should save a user, blogpost, and comments', (done) => {
		User.findOne({ name: 'James' })
			.populate({
				path: 'blogPosts',
				populate: {
					path: 'comments',
					model: 'comment',
					populate: {
						path: 'user',
						model: 'user'
					}
				}
			})
			.then((user) => {
				assert(user.name === 'James');
				assert(user.blogPosts[0].title === 'Ulysees');
				assert(user.blogPosts[0].comments[0].content === 'This novel is one of the most important works of modernist literature');
				assert(user.blogPosts[0].comments[0].user.name === 'James');
			});
			done();	
	});
});

