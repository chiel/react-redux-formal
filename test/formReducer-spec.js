import * as a from '../src/formActions';
import reducer from '../src/formReducer';
import test from 'tape';

test('formReducer', t => {
	t.deepEqual(
		reducer(undefined, {}),
		{},
		'should return initial state if state is undefined and no action matches'
	);

	t.deepEqual(
		reducer({}, {}),
		{},
		'should return given state if no action matches'
	);

	t.end();
});

test('formReducer :: FORM_INIT', t => {
	t.deepEqual(
		reducer(
			{},
			a.formInit(
				'testForm1',
				[
					'field1',
					'field2',
					'field3',
				],
			),
		),
		{
			testForm1: {
				fields: {
					field1: {
						dirty: false,
						error: null,
						touched: false,
					},
					field2: {
						dirty: false,
						error: null,
						touched: false,
					},
					field3: {
						dirty: false,
						error: null,
						touched: false,
					},
				},
				initial: {
					field1: '',
					field2: '',
					field3: '',
				},
				values: {
					field1: '',
					field2: '',
					field3: '',
				},
			},
		},
		'should properly create initial state for a new form',
	);

	t.end();
});

test('formReducer :: FORM_ADD_FIELD', t => {
	t.deepEqual(
		reducer(
			{
				testForm1: {
					fields: {
						field1: {
							dirty: false,
							error: null,
							touched: false,
						},
						field2: {
							dirty: false,
							error: null,
							touched: false,
						},
						field3: {
							dirty: false,
							error: null,
							touched: false,
						},
					},
					initial: {
						field1: '',
						field2: '',
						field3: '',
					},
					values: {
						field1: '',
						field2: '',
						field3: '',
					},
				},
			},
			a.formAddField('testForm1', 'field4'),
		),
		{
			testForm1: {
				fields: {
					field1: {
						dirty: false,
						error: null,
						touched: false,
					},
					field2: {
						dirty: false,
						error: null,
						touched: false,
					},
					field3: {
						dirty: false,
						error: null,
						touched: false,
					},
					field4: {
						dirty: false,
						error: null,
						touched: false,
					},
				},
				initial: {
					field1: '',
					field2: '',
					field3: '',
					field4: '',
				},
				values: {
					field1: '',
					field2: '',
					field3: '',
					field4: '',
				},
			},
		},
		'should add initial field state, initial value and current value for the new field',
	);

	t.end();
});

test('formReducer :: FIELD_UPDATE_VALUE', t => {
	t.deepEqual(
		reducer(
			{
				testForm1: {
					fields: {
						testField1: {
							dirty: false,
							error: null,
							touched: false,
						},
					},
					initial: {
						testField1: '',
					},
					values: {
						testField1: '',
					},
				},
			},
			a.fieldUpdate('testForm1', 'testField1', 'Value 1'),
		),
		{
			testForm1: {
				fields: {
					testField1: {
						dirty: true,
						error: null,
						touched: true,
					},
				},
				initial: {
					testField1: '',
				},
				values: {
					testField1: 'Value 1',
				},
			},
		},
		'should update an existing field',
	);

	t.deepEqual(
		reducer(
			{
				testForm1: {
					fields: {
						testField1: {
							dirty: false,
							error: null,
							touched: false,
						},
					},
					initial: {
						testField1: '',
					},
					values: {
						testField1: '',
					},
				},
			},
			a.fieldUpdate('testForm1', 'testField1', ''),
		),
		{
			testForm1: {
				fields: {
					testField1: {
						dirty: false,
						error: null,
						touched: true,
					},
				},
				initial: {
					testField1: '',
				},
				values: {
					testField1: '',
				},
			},
		},
		'should not mark a field as dirty if the value is same as the initial value',
	);

	t.end();
});

test('formReducer :: FIELD_VALIDATE_FAILURE', t => {
	t.deepEqual(
		reducer(
			{
				testForm1: {
					fields: {
						testField1: {
							dirty: false,
							error: null,
							touched: false,
						},
					},
					initial: {
						testField1: '',
					},
					values: {
						testField1: '',
					},
				},
			},
			a.fieldValidateFailure('testForm1', 'testField1', 'Error 1'),
		),
		{
			testForm1: {
				fields: {
					testField1: {
						dirty: false,
						error: 'Error 1',
						touched: false,
					},
				},
				initial: {
					testField1: '',
				},
				values: {
					testField1: '',
				},
			},
		},
		'should add a new field error',
	);

	t.deepEqual(
		reducer(
			{
				testForm1: {
					fields: {
						testField1: {
							dirty: false,
							error: null,
							touched: false,
						},
					},
					initial: {
						testField1: '',
					},
					values: {
						testField1: '',
					},
				},
			},
			a.fieldValidateFailure('testForm1', 'testField1', 'Error 1'),
		),
		{
			testForm1: {
				fields: {
					testField1: {
						dirty: false,
						error: 'Error 1',
						touched: false,
					},
				},
				initial: {
					testField1: '',
				},
				values: {
					testField1: '',
				},
			},
		},
		'should update an existing field error',
	);

	t.end();
});

test('formReducer :: FIELD_VALIDATE_SUCCESS', t => {
	t.deepEqual(
		reducer(
			{
				testForm1: {
					fields: {
						testField1: {
							dirty: false,
							error: 'Error 1',
							touched: false,
						},
					},
					initial: {
						testField1: '',
					},
					values: {
						testField1: '',
					},
				},
			},
			a.fieldValidateSuccess('testForm1', 'testField1'),
		),
		{
			testForm1: {
				fields: {
					testField1: {
						dirty: false,
						error: null,
						touched: false,
					},
				},
				initial: {
					testField1: '',
				},
				values: {
					testField1: '',
				},
			},
		},
		'should clear a field error properly',
	);

	t.end();
});
