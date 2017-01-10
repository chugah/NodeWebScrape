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
				assert(user.posts[0].title === 'Eating Sush');
			});
		done();
	});
});