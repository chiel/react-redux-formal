/**
 * Create a new email validator
 *
 * @param {String} [message] - The message to use if validator fails. Defaults to "Value is not a valid e-mail address"
 *
 * @return {Function} - The validator function
 */
export default function email(message = 'Value is not a valid e-mail address') {
	/**
	 * Check if value is a valid e-mail address
	 *
	 * @param {String} value - The value to validate
	 *
	 * @return {Promise} - Gets rejected if validator fails, resolved otherwise
	 */
	return function emailValidator(value) {
		return new Promise((resolve, reject) => {
			if (typeof value !== 'string') return reject('Given value is not a string');
			return /^[^@.]+(\.[^@.]+)*@[^.]+(\.[^.]+)+$/.test(value) ?
				resolve(value) :
				reject(message);
		});
	};
}
