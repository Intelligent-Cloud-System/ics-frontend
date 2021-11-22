/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
	mixed: {
		required: 'Field is required',
		// workaround for typeError - https://github.com/jquense/yup/issues/394
		notType: 'Value is not a ${type}',
	},
	string: {
		url: 'Value is not valid URL',
		max: 'Value must be at most ${max} characters',
	},
	number: {
		integer: 'Value must be integer number',
		min: 'Value must be greater than or equal to ${min}',
		max: 'Value must be less than or equal to ${max}',
	},
});

export default yup;
