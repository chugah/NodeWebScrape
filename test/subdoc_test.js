const assert = require('assert');
const User = require('../src/user');

describe('subdocument', () => {
	it('should create a subdocument', (done) => {
		const jean = new User({
			first_name: 'Jean',
			posts: [{ 
				title: 'Eating Sushi'
			}]
		});
		jean.save()
			.then(() => User.findOne({ first_name: 'Jean' }))
			.then((user) => {
				assert(user.posts[0].title === 'Eating Sushi');
			});
		done();
	});

	it('should add a new post (subdoc) to an existing user', (done) => {
		const dave = new User({
			first_name: 'Dave',
			posts: []
		});
		dave.save()
			.then(() => User.findOne({ first_name: 'Dave' }))
			.then((user) => {
				user.posts.push({ title: 'Cooking Italian' });
				return user.save();
			})
			.then(() => User.findONe({ name: 'Dave'}))
			.then((user) => {
				assert(user.posts[0].title === 'Cooking Italian');
			});
		done();
	});

	it('should delete a post (subdoc) to an existing user', (done) => {
		const francois = new User({
			first_name: 'Francois',
			posts: [{
				title: 'The Art of Making Bread'
			}]
		});
		francois.save()
			.then(() => User.findOne({ first_name: 'Francois' }))
			.then((user) => {
				user.posts[0].remove({ title: 'The Art of Making Bread' });
				return user.save();
			})
			.then(() => User.findOne({ name: 'Francois' }))
			.then((user) => {
				assert(user.posts.length === 0);
			});
		done();
	});
});