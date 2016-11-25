import createDefaultFields from '../../src/utils/createDefaultFields';
import test from 'tape';

test('utils/createDefaultFields', t => {
	t.deepEqual(
		createDefaultFields(
			[
				'field1',
				'field2',
				'field3',
			],
		),
		{
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
		'should properly create default fields state',
	);

	t.end();
});
