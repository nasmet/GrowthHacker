import moment from 'moment';

export default (originDate) => {
	if (!originDate) {
		return [moment(), moment()];
	}
	if (originDate.includes('abs')) {
		const arr = originDate.replace('abs:', '').split(',');
		return [moment(+arr[0] * 1000), moment(+arr[1] * 1000)];
	}
	if (originDate.includes('day')) {
		const number = +originDate.replace('day:', '');
		const start = getDate(number);
		return [moment(start), moment()];
	}
}

function getDate(num = 1) {
	return Date.now() - 24 * 60 * 60 * 1000 * num;
}