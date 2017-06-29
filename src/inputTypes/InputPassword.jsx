import PT from 'prop-types';
import React from 'react';

import field from '../Field';

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
	change: PT.func.isRequired,
	validate: PT.func.isRequired,
};

export default field(InputPassword);
