const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
	it('should return the number of posts', (done) => {
		const peter = new User({
			first_name: 'Peter',
			posts: [{ 
				title: 'Jumping beans'
			}]
		});
		peter.save()
			.then(() => User.findOne({ name: 'Peter' }))
			.then((user) => {
				assert(peter.postCount === 1)
			});	
		done();
	});
});