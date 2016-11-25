/**
 * Create default values state
 *
 * @param {Object} fields   - Object with field definitions
 * @param {Object} [values] - Object with initial values
 *
 * @return {Object} - Default values state
 */
export default function createDefaultValues(fields, values = {}) {
	const defaultValues = {};

	fields.forEach(fieldName => {
		defaultValues[fieldName] = typeof values[fieldName] !== 'undefined' ?
			values[fieldName] : '';
	});

	return defaultValues;
}
