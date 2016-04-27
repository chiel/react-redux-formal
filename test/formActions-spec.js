import * as a from '../src/formActions';
import * as c from '../src/formConstants';
import test from 'tape';

test('formActions :: fieldValidateSuccess', t => {
	const testField = 'myfield';
	const testForm = 'myform';

	t.deepEqual(
		a.fieldValidateSuccess(testForm, testField),
		{
			type: c.FIELD_VALIDATE_SUCCESS,
			formName: testForm,
			fieldName: testField,
		},
		'should create the action object properly'
	);

	t.end();
});

test('formActions :: fieldValidateFailure', t => {
	const testError = 'myerror';
	const testField = 'myfield';
	const testForm = 'myform';

	t.deepEqual(
		a.fieldValidateFailure(testForm, testField, testError),
		{
			type: c.FIELD_VALIDATE_FAILURE,
			formName: testForm,
			fieldName: testField,
			error: testError,
		},
		'should create the action object properly'
	);

	t.end();
});

test('formActions :: formInit', t => {
	t.deepEqual(
		a.formInit(
			'testForm1',
			{
				field1: {},
				field2: {},
				field3: {},
			},
			{
				field1: '',
				field2: '',
				field3: '',
			}
		),
		{
			type: c.FORM_INIT,
			formName: 'testForm1',
			fields: {
				field1: {},
				field2: {},
				field3: {},
			},
			values: {
				field1: '',
				field2: '',
				field3: '',
			},
		},
		'should create the action object properly'
	);

	t.end();
});
