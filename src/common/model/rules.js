import utils from '../utils/index';

export const rule = [{
	required: true,
	message: '必填',
}];

export const identifierRule = [{
	required: true,
	message: '字母、下划线、数字组成, 开头不能是数字',
	validator: (rule, value) => utils.checkIdentifier(value),
}]