const assert = require('assert');
const User = require('../src/user');

describe('Read a record in database', () => {
	var james, john, mary;
	
	beforeEach((done) => {
		james = new User({ 
			first_name: 'James', 
			last_name: 'Joyce' 
		});
		james.save();

		john = new User({ 
			first_name: 'John', 
			last_name: 'Smith' 
		});
		john.save();
		
		mary = new User({ 
			first_name: 'Mary', 
			last_name: 'Joyce' 
		});
		mary.save()
			.then(() => {
				done();
			});
	});
	
	it('should find all users with the same name', (done) => {
		User.find({ first_name: 'James' })
			.then((users) => {
				assert(users[0]._id.toString() === james._id.toString());
				done();
			});			
	});
	
	it('should find a user with a specific id', (done) => {
		User.findOne({ _id: james._id })
			.then((user) => {
				assert(user.first_name === 'James');
				done();
			});			
	});
});