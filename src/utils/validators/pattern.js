/**
 * Create a new pattern validator
 *
 * @param {RegExp} regex
 * @param {String} [message] - The message to use if validator fails. Defaults to "Value does not match pattern"
 *
 * @return {Function}
 */
export default function pattern(regex, message = 'Value does not match pattern') {
	if (typeof regex === 'string') regex = new RegExp(regex);
	if (!(regex instanceof RegExp)) {
		throw new Error(`${regex} is not a valid RegExp`);
	}

	/**
	 * Check if value matches given pattern
	 *
	 * @param {String} value - The value to validate
	 *
	 * @return {Promise} - Gets rejected if validator fails, resolved otherwise
	 */
	return function patternValidator(value) {
		return new Promise((resolve, reject) => {
			if (typeof value !== 'string') return reject('Given value is not a string');
			return regex.test(value) ?
				resolve(value) :
				reject(message);
		});
	};
}
