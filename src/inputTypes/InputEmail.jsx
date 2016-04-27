import field from '../Field';
import React from 'react';

export function InputEmail({ change, validate, ...props }) {
	return (
		<div className="formal__input">
			<input
				{...props}
				type="email"
				onBlur={ev => validate(ev.target.value)}
				onChange={ev => change(ev.target.value)}
			/>
		</div>
	);
}

InputEmail.propTypes = {
	change: React.PropTypes.func.isRequired,
	validate: React.PropTypes.func.isRequired,
};

export default field(InputEmail);
