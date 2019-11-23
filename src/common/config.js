const DEVHOST = 'http://10.16.117.92:30012';
const TESTHOST = 'http://10.16.98.212:30012';
const BUILDHOST = 'https://api.dw.cloudmaptech.com';
const DEVBASEURL = `${DEVHOST}/v1`;
const TESTBASEURL = `${TESTHOST}/v1`;
const BUILDBASEURL = `${BUILDHOST}/v1`;
export const BASEURL = getBaseUrl();
export const DOWNLOADURL = `${BASEURL}/management/event_entity/export`;
export const UPLOADURL = `${BASEURL}/management/event_entity/import`;
export const TIMEOUT = 10000;
export const TOKENKEY = 'Token';
export const LIMIT = 10;
export const ACCOUNT = 'ACCOUNT';
export const PASSWORD = 'PASSWORD';
export const USERNAME = 'USERNAME';
export const PROJECTID = 'PROJECTID';
export const PROJECTNAME = 'PROJECTNAME';
export const PROJECTAPPID = 'PROJECTAPPID';

function getBaseUrl() {
	switch (process.env.NODE_ENV) {
		case 'development':
			return DEVBASEURL;
		case 'production':
			return TESTBASEURL;
		default:
			return TESTBASEURL;
	}
}