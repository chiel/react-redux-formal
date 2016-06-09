import * as formActions from './formActions';
import * as coreInputTypes from './inputTypes';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reduxSpy from 'redux-spy';

export default setup => WrappedForm => {
	class Form extends React.Component {
		static propTypes = {
			fieldUpdate: React.PropTypes.func.isRequired,
			fieldValidate: React.PropTypes.func.isRequired,
			formInit: React.PropTypes.func.isRequired,
			formValidate: React.PropTypes.func.isRequired,
			options: React.PropTypes.object.isRequired,
			spy: React.PropTypes.func.isRequired,
		}

		constructor({ options }) {
			super();

			this.formValidate = this.formValidate.bind(this);
			this.getValues = this.getValues.bind(this);

			this.inputTypes = { ...coreInputTypes, ...(options.inputTypes || {}) };
		}

		componentWillMount() {
			const { formInit, options } = this.props;

			formInit(
				options.name,
				options.fields,
				options.values || {}
			);
		}

		getValues() {
			return this.props.spy('values');
		}

		change(fieldName) {
			const { fieldUpdate, options } = this.props;

			return value => {
				fieldUpdate(options.name, fieldName, value);
			};
		}

		validate(fieldName, validators) {
			const { fieldValidate, options } = this.props;

			return value => {
				fieldValidate(options.name, fieldName, validators, value)
					.catch(() => {});
			};
		}

		formValidate() {
			const { formValidate, options } = this.props;

			return formValidate(
				options.name,
				options.fields,
				this.getValues()
			)
				.then(() => Promise.resolve(this.getValues()));
		}

		createFields() {
			const { options } = this.props;

			const fieldComponents = {};
			Object.keys(options.fields).forEach(fieldName => {
				const field = options.fields[fieldName];
				const InputType = this.inputTypes[field.type];

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

		render() {
			const { ...customProps } = this.props;

			[
				'fieldUpdate',
				'fieldValidate',
				'fieldValidateSuccess',
				'fieldValidateFailure',
				'formInit',
				'formValidate',
				'options',
				'spy',
			].forEach(prop => {
				delete customProps[prop];
			});

			return (
				<WrappedForm
					{...customProps}
					fields={this.createFields()}
					formValidate={this.formValidate}
					getValues={this.getValues}
				/>
			);
		}
	}

	function SpyWrap({ ...props }) {
		const Spy = reduxSpy(state => ({
			values: (state.form[props.options.name] || { values: {} }).values,
		}))(Form);

		return <Spy {...props} />;
	}

	SpyWrap.propTypes = {
		options: React.PropTypes.object.isRequired,
	};

	return connect(
		(...args) => ({ options: setup(...args) }),
		dispatch => bindActionCreators(formActions, dispatch)
	)(SpyWrap);
};
