const regex = {
	pw: /^(\w){8,32}$/,
	phone: /^1[3456789]\d{9}$/,
	mark: /^[a-zA-Z_][a-zA-Z0-9_]{1,31}$/,
}

const {
	pw,
	phone,
	mark,
} = regex;

function check(type, value) {
	if (type.test(value)) {
		return true;
	}
	return false;
}

/**
 * 密码验证,只能输入8-32个字母、数字、下划线
 * @date   2019-07-02
 * @param  {[type]}   s [description]
 * @return {Boolean}    [description]
 */
export function checkPasswd(s) {
	return check(pw, value);
}

/**
 * 手机号验证
 * @date   2019-07-02
 * @return {[type]}   [description]
 */
export function checkPhone(value) {
	return check(phone, value);
}

/**
 * 标识符验证
 * @date   2019-07-02
 * @return {[type]}   [description]
 */
export function checkMark(value) {
	return check(mark, value);
}

export function checkUsername(value) {
	return check(username, value);
}