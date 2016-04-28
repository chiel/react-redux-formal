import * as formActions from './formActions';
import * as inputTypes from './inputTypes';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reduxSpy from 'redux-spy';

const defaultInitialValues = {};

export default options => WrappedForm => connect(
	state => ({
		initialValues: options.getInitialValues ?
			options.getInitialValues(state) :
			defaultInitialValues,
	}),
	dispatch => bindActionCreators(formActions, dispatch)
)(reduxSpy(state => ({
	values: (state.form[options.name] || { values: {} }).values,
}))(
	class Form extends React.Component {
		static propTypes = {
			fieldUpdate: React.PropTypes.func.isRequired,
			fieldValidate: React.PropTypes.func.isRequired,
			formInit: React.PropTypes.func.isRequired,
			formValidate: React.PropTypes.func.isRequired,
			initialValues: React.PropTypes.object.isRequired,
			spy: React.PropTypes.func.isRequired,
		}

		constructor(props) {
			super();

			this.formValidate = this.formValidate.bind(this);
			this.getValues = this.getValues.bind(this);

			props.formInit(
				options.name,
				options.fields,
				props.initialValues
			);
		}

		change(fieldName) {
			return value => {
				this.props.fieldUpdate(options.name, fieldName, value);
			};
		}

		validate(fieldName, validators) {
			return value => {
				this.props.fieldValidate(options.name, fieldName, validators, value)
					.catch(() => {});
			};
		}

		createFields() {
			const fieldComponents = {};
			Object.keys(options.fields).forEach(fieldName => {
				const field = options.fields[fieldName];
				const InputType = inputTypes[field.type];

				const ConnectedInput = connect(state => ({
					error: state.form[options.name].fields[fieldName].error,
					value: state.form[options.name].values[fieldName],
				}))(InputType);

				fieldComponents[fieldName] = (
					<ConnectedInput
						{...field}
						name={fieldName}
						change={this.change(fieldName)}
						validate={this.validate(fieldName, field.validators)}
					/>
				);
			});

			return fieldComponents;
		}

		formValidate() {
			return this.props.formValidate(
				options.name,
				options.fields,
				this.getValues()
			)
				.then(() => Promise.resolve(this.getValues()));
		}

		getValues() {
			return this.props.spy('values');
		}

		render() {
			return (
				<WrappedForm
					fields={this.createFields()}
					formValidate={this.formValidate}
					getValues={this.getValues}
				/>
			);
		}
	}
));
