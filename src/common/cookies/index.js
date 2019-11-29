import Cookies from 'universal-cookie';
import moment from 'moment';

const cookies = new Cookies();
const options = {
	expires: new Date(moment().add(1, 'days').valueOf()),
	path: '/',
};
export default {
	set(key, value) {
		cookies.set(key, value, options);
	},
	get(key) {
		return cookies.get(key);
	},
	remove(key) {
		cookies.remove(key, options);
	},
};