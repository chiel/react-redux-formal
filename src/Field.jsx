import PT from 'prop-types';
import React from 'react';

export default Input => {
	function Field({ error, label, ...props }) {
		return (
			<div className="formal__field">
				{label ? (
					<label className="formal__label">{label}</label>
				) : ''}
				<Input {...props} />
				{error ? (
					<span className="formal__error">{error}</span>
				) : ''}
			</div>
		);
	}

	Field.propTypes = {
		error: PT.string,
		label: PT.string,
	};

	return Field;
};
