const initialFieldState = {
	dirty: false,
	error: null,
	touched: false,
};

/**
 * Create default fields state
 *
 * @param {Object} fields - Object with field definitions
 *
 * @return {Object} - Default fields state
 */
export default function createDefaultFields(fields) {
	const defaultFields = {};

	Object.keys(fields).forEach(fieldName => (
		defaultFields[fieldName] = { ...initialFieldState }
	));

	return defaultFields;
}

