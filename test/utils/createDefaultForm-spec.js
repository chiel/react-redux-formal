import createDefaultForm from '../../src/utils/createDefaultForm';
import test from 'tape';

test('utils/createDefaultForm', t => {
	t.deepEqual(
		createDefaultForm(
			[
				'field1',
			],
			{
				field1: 'Value 1',
			},
		),
		{
			fields: {
				field1: {
					dirty: false,
					error: null,
					touched: false,
				},
			},
			initial: {
				field1: 'Value 1',
			},
			values: {
				field1: 'Value 1',
			},
		},
		'should properly create default form state',
	);

	t.end();
});
