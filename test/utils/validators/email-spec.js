import email from '../../../src/utils/validators/email';
import test from 'tape';

test('utils/validators/email', t => {
	t.plan(4);

	t.equal(
		typeof email(),
		'function',
		'should return a function'
	);

	const testEmail = 'johndoe@example.com';
	email()(testEmail).then(value => {
		t.equal(
			value,
			testEmail,
			'should pass the value through when validator passes'
		);
	});

	email()('notanemail').catch(err => {
		t.equal(
			err,
			'Value is not a valid e-mail address',
			'should provide a sensible default error message'
		);
	});

	const testError = 'Not a valid email address';
	email(testError)('notanemail').catch(err => {
		t.equal(
			err,
			testError,
			'should use custom error message if provided'
		);
	});
});
