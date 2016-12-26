const assert = require('assert');
const User = require('../src/user');

describe('Delete a record', () => {
	var james;

	beforeEach((done) => {
		james = new User({ 
			first_name: 'James', 
			last_name: 'Joyce' 
		});
		
		james.save()
			.then(() => {
				done();
			});
	});

	function eraseName (erase, done) {
		erase
			.then(() => User.findOne({ first_name: 'James' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	}
	
	it('should remove a user via model instance Remove', (done) => {
		eraseName(james.remove({ first_name: 'James' }), done);
	});

	it('should remove a user via class method Remove', (done) => {
		eraseName(User.remove({ first_name: 'James'}), done);
	});

	it('should remove a user via class method findOneAndRemove', (done) => {
		eraseName(User.findOneAndRemove({ first_name: 'James' }), done);
	});

	it('should remove a user via class method findByIdAndRemove', (done) => {
		eraseName(User.findByIdAndRemove(james._id), done);
	});
});