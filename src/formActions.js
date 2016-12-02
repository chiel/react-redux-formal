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
 * Add a new field to a form
 *
 * @param {String} formName  - Form to add field to
 * @param {String} fieldName - Name of the field to add
 * @param {Mixed} value      - Initial value of the field
 */
export function formAddField(formName, fieldName, value) {
	return { type: c.FORM_ADD_FIELD, formName, fieldName, value };
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
 * Reset a form's values back to its initial values
 *
 * @param {String} formName - Form to reset
 *
 * @return {Object} - The action
 */
export function formReset(formName) {
	return { type: c.FORM_RESET, formName };
}
