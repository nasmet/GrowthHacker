export const getDate = (arg) => {
	if (arg) {
		return new Date(arg);
	}
	return new Date();
};

export const dateMap = (arg) => {
	const date = getDate(arg);
	return {
		Y: date.getFullYear(),
		M: date.getMonth() + 1,
		D: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds(),
		ms: date.getTime(),
	};
};

/**
 * 时间戳格式化
 * @date   2019-07-04
 * @param  {[number]}   unix 时间戳
 * @param  {[string]}   fmt  时间格式  Y-M-D h:m:s
 * @return {string}
 */
export function formatUnix(unix, fmt) {
	const map = dateMap(unix * 1000);
	Object.keys(map).forEach((k) => {
		if (new RegExp(`(${k})`).test(fmt)) {
			fmt = fmt.replace(RegExp.$1, addZero(map[k]));
		}
	});
	return fmt;
}

function addZero(num) {
	return num < 10 ? `0${num}` : num;
}

/**
 * 时间格式化
 * @date   2019-10-23
 * @param  {[number]}   秒
 * @return {string}
 */
const day = 24 * 3600;
const hour = 3600;
const minute = 60;

export function formatTime(time) {
	let d, h, m, s;
	d = parseInt(time / day)
	h = parseInt((time % day) / hour);
	m = parseInt((time % hour) / minute);
	s = time % minute;
	if (d !== 0) {
		return `${d}d ${h}h:${m}m:${s}s`
	}
	if (h !== 0) {
		return `${h}h:${m}m:${s}s`
	}
	if (m !== 0) {
		return `${m}m:${s}s`;
	}

	return `${s}s`;
}