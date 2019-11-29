import moment from 'moment';

export function transformDate(originDate) {
	if (!originDate) {
		return [moment(getStartDate()), moment(getEndDate())];
	}
	if (originDate.includes('abs')) {
		const arr = originDate.replace('abs:', '').split(',');
		return [moment(+arr[0] * 1000), moment(+arr[1] * 1000)];
	}
	if (originDate.includes('day')) {
		const number = +originDate.replace('day:', '');
		const start = getStartDate(number);
		const end = getEndDate();
		return [moment(start), moment(end)];
	}
}

export function getStartDate(num = 0) {
	const date = Date.now() - 24 * 60 * 60 * 1000 * num;
	const {
		Y,
		M,
		D,
	} = utils.dateMap(date);
	return `${Y}-${M}-${D}`;
}

export function getEndDate(num = 0) {
	return `${getStartDate(num)} 23:59:59`;
}