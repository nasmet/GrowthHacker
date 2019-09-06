export function debounce(fn, wait) {
	let timeout = null;
	return function(e) {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(fn.bind(this, e), wait);
	}
}

export function throttle(func, delay) {
	let timer = null;
	let startTime = Date.now();
	return function() {
		const curTime = Date.now();
		const remaining = delay - (curTime - startTime);
		const context = this;
		const args = arguments;
		clearTimeout(timer);
		if (remaining <= 0) {
			func.apply(context, args);
			startTime = Date.now();
		} else {
			timer = setTimeout(func, remaining);
		}
	}
}