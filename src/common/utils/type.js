const types = {
	1: '[object Object]',
	2: '[object Number]',
	3: '[object String]',
	4: '[object Array]',
};

function TypeJudgment({
	arg,
	type = 1,
}) {
	return Reflect.toString.call(arg) === types[type];
}

export function isObject(arg) {
	return TypeJudgment({
		arg,
	});
}

export function isNumber(arg) {
	return TypeJudgment({
		arg,
		type: 2,
	});
}

export function isString(arg) {
	return TypeJudgment({
		arg,
		type: 3,
	});
}

export function isArray(arg) {
	return TypeJudgment({
		arg,
		type: 4,
	});
}

export function isEmptyObject(arg) {
	return Object.keys(arg).length === 0 ? true : false;
}