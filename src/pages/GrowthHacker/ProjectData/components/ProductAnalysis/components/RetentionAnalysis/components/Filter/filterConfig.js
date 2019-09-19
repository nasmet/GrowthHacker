export const rules = [{
	value: 1,
	label: '等于',
	showLast: true,
	exec(key, label) {
		return `${key}=${label}`;
	}
}, {
	value: 2,
	label: '不等于',
	showLast: true,
	exec(key, label) {
		return `${key}!=${label}`;
	}
}, {
	value: 3,
	label: '包含',
	showLast: true,
	exec(key, label) {
		return `${key}include(${label})`;
	}
}, {
	value: 4,
	label: '不包含',
	showLast: true,
	exec(key, label) {
		return `${key}notinclude${label}`;
	}
}, {
	value: 5,
	label: '有值',
	showLast: false,
	exec(key, label) {
		return `${key}!=null`;
	}
}, {
	value: 6,
	label: '没值',
	showLast: false,
	exec(key, label) {
		return `${key}=null`;
	}
}, {
	value: 7,
	label: '为空',
	showLast: false,
	exec(key, label) {
		return `${key}=''`;
	}
}, {
	value: 8,
	label: '不为空',
	showLast: false,
	exec(key, label) {
		return `${key}!=''`;
	}
}, {
	value: 9,
	label: '正则匹配',
	showLast: true,
	exec(key, label) {
		return `${key}.test(${label})=true`;
	}
}, {
	value: 10,
	label: '正则不匹配',
	showLast: true,
	exec(key, label) {
		return `${key}.test(${label})=false`;
	}
}]