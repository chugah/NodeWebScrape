const assert = require('assert');
const User = require('../src/user');

describe('Validate a record', () => { 
	it('should ensure a first name is provided', () => {
		const user = new User({
			first_name: undefined
		});
		const validationResult = user.validateSync();
		console.log(validationResult);
		const message = validationResult.errors.first_name.message;
		assert (message === 'First name is required.');
	});

	it('should ensure first name is at least 2 characters', () => {
		const user = new User({
			first_name: 'Jo'
		});
		const validationResult = user.validateSync();
		console.log(validationResult);
		const message = validationResult.errors.first_name.message;
		assert (message === 'First name must be 2 or more characters.');
	});
});