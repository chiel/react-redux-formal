import * as c from './formConstants';

/**
 * Update value of field
 *
 * @param {String} formName  - Name of the form the field belongs to
 * @param {String} fieldName - Name of the field
 * @param {Mixed} value      - The value to validate
 *
 * @return {Object} - The action
 */
export function fieldUpdate(formName, fieldName, value) {
	return { type: c.FIELD_UPDATE_VALUE, formName, fieldName, value };
}

/**
 * Mark a field's validation as successful
 *
 * @param {String} formName  - Name of the form the field belongs to
 * @param {String} fieldName - Name of the field
 *
 * @return {Object} - The action
 */
export function fieldValidateSuccess(formName, fieldName) {
	return { type: c.FIELD_VALIDATE_SUCCESS, formName, fieldName };
}

/**
 * Mark a field's validation as failed
 *
 * @param {String} formName  - Name of the form the field belongs to
 * @param {String} fieldName - Name of the field
 * @param {String} error     - The error raised by the validator
 *
 * @return {Object} - The action
 */
export function fieldValidateFailure(formName, fieldName, error) {
	return { type: c.FIELD_VALIDATE_FAILURE, formName, fieldName, error };
}

/**
 * Validate a single field
 *
 * @param {String} formName       - Name of the form the field belongs to
 * @param {String} fieldName      - Name of the field
 * @param {Function[]} validators - Array of validator functions
 * @param {Mixed} value           - The value to validate
 *
 * @return {Function} - The delayed action
 */
export function fieldValidate(formName, fieldName, validators, value) {
	if (!validators || !validators.length) return () => Promise.resolve(value);

	const [fv, ...v] = validators;

	return dispatch => v.reduce((a, b) => a.then(b), fv(value || ''))
		.then(nextValue => {
			dispatch(fieldValidateSuccess(formName, fieldName));
			return Promise.resolve(nextValue);
		})
		.catch(err => {
			dispatch(fieldValidateFailure(formName, fieldName, err));
			return Promise.reject(err);
		});
}

/**
 * Initialize a form
 *
 * @param {String} formName - Form to initialise
 * @param {Object} fields   - Form fields
 * @param {Object} values   - Form values
 *
 * @return {Object} - The action
 */
export function formInit(formName, fields, values) {
	return { type: c.FORM_INIT, formName, fields, values };
}

/**
 * Validate given form
 *
 * @param {String} formName - Form to validate
 * @param {Object} fields   - Form fields
 * @param {Object} values   - Form values
 *
 * @return {Function} - The delayed action
 */
export function formValidate(formName, fields, values) {
	return dispatch => (
		Promise.all(Object.keys(fields).map(fieldName => (
			dispatch(fieldValidate(formName, fieldName, fields[fieldName].validators, values[fieldName]))
		)))
	);
}
