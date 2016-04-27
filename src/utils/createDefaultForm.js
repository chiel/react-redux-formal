import createDefaultFields from './createDefaultFields';
import createDefaultValues from './createDefaultValues';

/**
 * Create default form state
 *
 * @param {Object} fields   - Object with field definitions
 * @param {Object} [values] - Object with initial values
 *
 * @return {Object}
 */
export default function createDefaultForm(fields, values) {
	return {
		fields: createDefaultFields(fields),
		initial: createDefaultValues(fields, values),
		values: createDefaultValues(fields, values),
	};
}
