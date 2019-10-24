export const rules = [{
	value: '=',
	label: '等于',
}, {
	value: '<',
	label: '小于',
}, {
	value: '>',
	label: '大于',
}, {
	value: '>=',
	label: '大于等于',
}, {
	value: '<=',
	label: '小于等于',
}]

export const originRules = [{
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

export const firstColumn = [{
	label: '用户做过',
	value: 'true,event',
}, {
	label: '用户没做过',
	value: 'false,event',
}, {
	label: '用户是',
	value: 'true,dimension',
}, {
	label: '用户不是',
	value: 'false,dimension',
}]

export const opMap = {
	0: 'A',
	1: 'B',
	2: 'C',
	3: 'D',
}