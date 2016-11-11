module.exports = {
	extends: 'airbnb',
	parser: 'babel-eslint',
	plugins: [
		'react',
	],
	rules: {
		'arrow-parens': [2, 'as-needed'],
		indent: [2, 'tab'],
		'max-len': 0,
		'no-tabs': 0,
		'no-param-reassign': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
	},
};
