import PT from 'prop-types';
import React from 'react';

import field from '../Field';

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
	change: PT.func.isRequired,
	validate: PT.func.isRequired,
};

export default field(InputEmail);
