import PT from 'prop-types';
import React from 'react';

import field from '../Field';

export function InputText({ change, validate, ...props }) {
	return (
		<div className="formal__input">
			<input
				{...props}
				type="text"
				onBlur={ev => validate(ev.target.value)}
				onChange={ev => change(ev.target.value)}
			/>
		</div>
	);
}

InputText.propTypes = {
	change: PT.func.isRequired,
	validate: PT.func.isRequired,
};

export default field(InputText);
