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


// 深拷贝对象
export function deepObject(...parm) {
	let result = {};
	parm.forEach(v => {
		if (Reflect.toString.call(v) !== "[object Object]") {
			throw new Error('参数错误');
		}
		Object.keys(v).forEach(key => {
			switch (Reflect.toString.call(v[key])) {
				case "[object Object]":
					if (result[key]) {
						result[key] = deepObject(result[key], v[key]);
					} else {
						result[key] = deepObject(v[key]);
					}
					break;
				case "[object Array]":
					if (result[key]) {
						result[key] = deepArray(result[key], v[key]);
					} else {
						result[key] = deepArray(v[key]);
					}
					break;
				default:
					result[key] = v[key];
					break;
			}
		});
	});
	return result;
}

// 深拷贝数组
export function deepArray(...parm) {
	let result = [];
	parm.forEach(v => {
		if (Reflect.toString.call(v) !== "[object Array]") {
			throw new Error('参数错误');
		}
		v.forEach(item => {
			switch (Reflect.toString.call(item)) {
				case "[object Object]":
					result.push(deepObject(item));
					break;
				case "[object Array]":
					result.push(deepArray(item))
					break;
				default:
					result.push(item);
					break;
			}
		});
	});
	return result;
}