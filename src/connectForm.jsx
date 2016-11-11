/* eslint-disable react/no-multi-comp */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import reduxSpy from 'redux-spy';

import * as formActions from './formActions';
import * as coreInputTypes from './inputTypes';

const PT = React.PropTypes;

export default setup => WrappedForm => {
	class Form extends React.Component {
		static propTypes = {
			fieldUpdate: PT.func.isRequired,
			fieldValidate: PT.func.isRequired,
			formInit: PT.func.isRequired,
			formValidate: PT.func.isRequired,
			options: PT.shape({
				name: PT.string.isRequired,
			}).isRequired,
			spy: PT.func.isRequired,
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
				options.values || {},
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
				this.getValues(),
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
				}), () => ({}))(InputType);

				fieldComponents[fieldName] = props => (
					<ConnectedInput
						{...field}
						{...props}
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

	class SpyWrap extends React.Component {
		static propTypes = {
			options: PT.shape({
				name: PT.string.isRequired,
			}).isRequired,
		};

		shouldComponentUpdate() {
			return false;
		}

		render() {
			const Spy = reduxSpy(state => ({
				values: (state.form[this.props.options.name] || { values: {} }).values,
			}))(Form);

			return <Spy {...this.props} />;
		}
	}

	return connect(
		(...args) => {
			let memoized;
			return (function getMemoizedState() {
				if (memoized) return memoized;

				memoized = { options: setup(...args) };
				return memoized;
			}());
		},
		dispatch => bindActionCreators(formActions, dispatch),
	)(SpyWrap);
};
