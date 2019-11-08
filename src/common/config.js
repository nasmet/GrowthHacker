export const DEVHOST = 'http://10.16.117.92:8080';
export const TESTHOST = 'http://10.16.98.212:30010';
export const BUILDHOST = 'https://api.dw.cloudmaptech.com';
export const DEVBASEURL = `${DEVHOST}/v1`;
export const TESTBASEURL = `${TESTHOST}/v1`;
export const BUILDBASEURL = `${BUILDHOST}/v1`;
export const TIMEOUT = 10000;
export const TOKENKEY = 'Token';
export const LIMIT = 10;
export const ACCOUNT = 'ACCOUNT';
export const PASSWORD = 'PASSWORD';
export const USERNAME = 'USERNAME';
export const PROJECTID = 'PROJECTID';
export const PROJECTNAME = 'PROJECTNAME';
export const PROJECTIDAPPID = 'PROJECTIDAPPID';
export const DOWNLOADURL = `${DEVBASEURL}/management/event_entity/export`;
export const UPLOADURL = `${DEVBASEURL}/management/event_entity/import`;
export const operators = [{
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
}, {
	value: 'like',
	label: '包含',
}, {
	value: 'not like',
	label: '不包含',
}];