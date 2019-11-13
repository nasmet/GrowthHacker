import moment from 'moment';

const currentDate = moment();
export default (date, view) => {
	switch (view) {
		case 'date':
			return date.valueOf() > currentDate.valueOf();
		case 'year':
			return date.year() >= currentDate.year();
		case 'month':
			return date.year() * 100 + date.month() >= currentDate.year() * 100 + currentDate.month();
		default:
			return false;
	}
};