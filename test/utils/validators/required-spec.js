import required from '../../../src/utils/validators/required';
import test from 'tape';

test('utils/validators/required', t => {
	t.plan(4);

	t.equal(
		typeof required(),
		'function',
		'should return a function'
	);

	const testValue = 'test';
	required()(testValue).then(value => {
		t.equal(
			value,
			testValue,
			'should pass the value through when validator passes'
		);
	});

	required()('').catch(err => {
		t.equal(
			err,
			'Value is required',
			'should provide a sensible default error message'
		);
	});

	const testError = 'This field is required';
	required(testError)('').catch(err => {
		t.equal(
			err,
			testError,
			'should use custom error message if provided'
		);
	});
});
