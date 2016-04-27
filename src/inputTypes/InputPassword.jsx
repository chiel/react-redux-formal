import field from '../Field';
import React from 'react';

export function InputPassword({ change, validate, ...props }) {
	return (
		<div className="formal__input">
			<input
				{...props}
				type="password"
				onBlur={ev => validate(ev.target.value)}
				onChange={ev => change(ev.target.value)}
			/>
		</div>
	);
}

InputPassword.propTypes = {
	change: React.PropTypes.func.isRequired,
	validate: React.PropTypes.func.isRequired,
};

export default field(InputPassword);
