const assert = require('assert');
const User = require('../src/user');

describe('Delete a record', () => { 
	var james;

	beforeEach((done) => {
		james = new User({ 
			first_name: 'James', 
			last_name: 'Joyce', 
			postCount: 0 
		});
		
		james.save()
			.then(() => {
				done();
			});
	});

	function changeName(change, done) {
		change
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].first_name === 'Miriam');
				done();
			});
	}

	it('should update a user via model instance method Set and Save', (done) => {
		james.set('first_name', 'Miriam');
		changeName(james.save(), done);		
	});

	it('should update a user via model instance method Update', (done) => {
		changeName(james.update({ first_name: 'Miriam' }), done);
	});

	it('should update a user via class method Update', (done) => {
		changeName(User.update({ first_name: 'James'}, { first_name: 'Miriam' }), done);
	});

	it('should update a user via class method findOneAndUpdate', (done) => {
		changeName(User.findOneAndUpdate({ first_name: 'James' }, { first_name: 'Miriam' }), done);
	});

	it('should update a user via class method findByIdAndUpdate', (done) => {
		changeName(User.findByIdAndUpdate(james._id, { first_name: 'Miriam' }), done);
	});

	it('should increment the number of posts for a given user by 1', (done) => {
		User.update({ first_name: 'James'}, { $inc: { postCount: 1 } })
			.then(() => User.findOne({ first_name: 'James'}))
			.then((user) => {
				assert(user.postCount === 1);
				done();
			});
	});
});