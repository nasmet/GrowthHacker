export const numOperators = [{
	value: '=',
	label: '等于',
}, {
	value: '>',
	label: '大于',
}, {
	value: '<',
	label: '小于',
}, {
	value: '>=',
	label: '大于等于',
}, {
	value: '<=',
	label: '小于等于',
}, {
	value: '!=',
	label: '不等于',
}];
export const strOperators = [{
	value: '=',
	label: '等于',
}, {
	value: '!=',
	label: '不等于',
}, {
	value: 'in',
	label: '在...范围内',
}, {
	value: 'not in',
	label: '不在...范围内',
}, {
	value: 'like',
	label: '包含',
}, {
	value: 'not like',
	label: '不包含',
}]

export const allOperators = [...numOperators, {
	value: 'in',
	label: '在...范围内',
}, {
	value: 'not in',
	label: '不在...范围内',
}, {
	value: 'like',
	label: '包含',
}, {
	value: 'not like',
	label: '不包含',
}];