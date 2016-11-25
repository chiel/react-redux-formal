import createDefaultValues from '../../src/utils/createDefaultValues';
import test from 'tape';

test('utils/createDefaultValues', t => {
	t.deepEqual(
		createDefaultValues(
			[
				'field1',
				'field2',
				'field3',
			],
		),
		{
			field1: '',
			field2: '',
			field3: '',
		},
		'should properly create default values when no initial values are given',
	);

	t.deepEqual(
		createDefaultValues(
			[
				'field1',
				'field2',
				'field3',
			],
			{
				field1: 'Value 1',
			},
		),
		{
			field1: 'Value 1',
			field2: '',
			field3: '',
		},
		'should properly create default values when only some initial values are given',
	);

	t.deepEqual(
		createDefaultValues(
			[
				'field1',
				'field2',
				'field3',
			],
			{
				field1: 'Value 1',
				field2: 'Value 2',
				field3: 'Value 3',
			},
		),
		{
			field1: 'Value 1',
			field2: 'Value 2',
			field3: 'Value 3',
		},
		'should properly create default values when all initial values are given',
	);

	t.end();
});

