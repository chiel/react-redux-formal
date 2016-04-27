import pattern from '../../../src/utils/validators/pattern';
import test from 'tape';

test('utils/validators/pattern', t => {
	t.plan(9);

	try {
		pattern();
	} catch (err) {
		t.equal(
			err.message,
			'undefined is not a valid RegExp',
			'should throw an error if no pattern is provided'
		);
	}

	try {
		pattern({});
	} catch (err) {
		t.equal(
			err.message,
			'[object Object] is not a valid RegExp',
			'should throw an error if an invalid pattern is provided'
		);
	}

	t.equal(
		typeof pattern(/[a-z]/),
		'function',
		'should return a function'
	);

	pattern('[a-z]')('a').then(() => {
		t.pass(
			'should convert string patterns to a RegExp'
		);
	});

	pattern(/abc/)('abc').then(() => {
		t.pass(
			'should pass for valid input'
		);
	});

	pattern(/abc/)('bac').catch(() => {
		t.pass(
			'should fail for invalid input'
		);
	});

	const testValue = 'abc';
	pattern(/abc/)(testValue).then(value => {
		t.equal(
			value,
			testValue,
			'should pass the value through when validator passes'
		);
	});

	pattern(/abc/)('bac').catch(err => {
		t.equal(
			err,
			'Value does not match pattern',
			'should provide a sensible default error message'
		);
	});

	const testError = 'Input should match "abc"';
	pattern(/abc/, testError)('bac').catch(err => {
		t.equal(
			err,
			testError,
			'should use custom error message if provided'
		);
	});
});
