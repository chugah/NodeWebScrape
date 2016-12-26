const assert = require('assert');
const User = require('../src/user');

describe('Create a record', () => {
	it('should save a user', (done) => {
		const james = new User({ 
			first_name: 'James', 
			last_name: 'Joyce' 
		});
		
		james.save()
			.then(() => {
				assert(!james.isNew);
				done();
			});
	});
});