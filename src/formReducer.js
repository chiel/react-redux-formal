import * as c from './formConstants';
import createDefaultForm from './utils/createDefaultForm';

/**
 * Form reducer
 *
 * @param {Object} state  - The current state
 * @param {Object} action - The action to process
 *
 * @return {Object} - The new state
 */
export default function formReducer(state = {}, action) {
	/**
	 * FORM_INIT
	 *
	 * Initialise a new form's state
	 *
	 * @param {String} action.formName
	 * @param {Object} action.fields
	 * @param {Object} action.values
	 */
	if (action.type === c.FORM_INIT) {
		return { ...state,
			[action.formName]: createDefaultForm(action.fields, action.values),
		};
	}

	/**
	 * FIELD_UPDATE_VALUE
	 *
	 * Update the value of a field
	 *
	 * @param {String} action.formName
	 * @param {String} action.fieldName
	 * @param {Mixed} action.value
	 */
	if (action.type === c.FIELD_UPDATE_VALUE) {
		return { ...state,
			[action.formName]: {
				...state[action.formName],
				fields: {
					...state[action.formName].fields,
					[action.fieldName]: {
						...state[action.formName].fields[action.fieldName],
						dirty: action.value !== state[action.formName].initial[action.fieldName],
						touched: true,
					},
				},
				values: {
					...state[action.formName].values,
					[action.fieldName]: action.value,
				},
			},
		};
	}

	/**
	 * FIELD_VALIDATE_FAILURE
	 *
	 * Set a field's error
	 *
	 * @param {String} action.formName
	 * @param {String} action.fieldName
	 * @param {String} action.error
	 */
	if (action.type === c.FIELD_VALIDATE_FAILURE) {
		return {
			...state,
			[action.formName]: {
				...state[action.formName],
				fields: {
					...state[action.formName].fields,
					[action.fieldName]: {
						...state[action.formName].fields[action.fieldName],
						error: action.error,
					},
				},
			},
		};
	}

	/**
	 * FIELD_VALIDATE_SUCCESS
	 *
	 * Clear a field's error
	 *
	 * @param {String} action.formName
	 * @param {String} action.fieldName
	 */
	if (action.type === c.FIELD_VALIDATE_SUCCESS) {
		return {
			...state,
			[action.formName]: {
				...state[action.formName],
				fields: {
					...state[action.formName].fields,
					[action.fieldName]: {
						...state[action.formName].fields[action.fieldName],
						error: null,
					},
				},
			},
		};
	}

	return state;
}
