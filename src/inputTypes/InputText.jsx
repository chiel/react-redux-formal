import field from '../Field';
import React from 'react';

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
	change: React.PropTypes.func.isRequired,
	validate: React.PropTypes.func.isRequired,
};

export default field(InputText);
