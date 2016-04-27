/**
 * Create a new required validator
 *
 * @param {String} [message] - The message to use if validator fails. Defaults to "Value is required"
 *
 * @return {Function} - The validator function
 */
export default function required(message = 'Value is required') {
	/**
	 * Check if given value passes the required validator
	 *
	 * @param {String} value - The value to validate
	 *
	 * @return {Promise} - Gets rejected if validator fails, resolved otherwise
	 */
	return function requiredValidator(value) {
		return new Promise((resolve, reject) => {
			if (typeof value !== 'string') return reject('Given value is not a string');
			return value.replace(/\s+/, '') !== '' ?
				resolve(value) :
				reject(message);
		});
	};
}
