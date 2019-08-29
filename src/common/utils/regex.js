/**
 * 密码验证,只能输入8-32个字母、数字、下划线
 * @date   2019-07-02
 * @param  {[type]}   s [description]
 * @return {Boolean}    [description]
 */
export function checkPasswd(s) {
  const patrn = /^(\w){8,32}$/;
  if (!patrn.exec(s)) return false;
  return true;
}

/**
 * 手机号验证
 * @date   2019-07-02
 * @return {[type]}   [description]
 */
export function checkPhone(value) {
  if (!(/^1[3456789]\d{9}$/.test(value))) {
    return false;
  }
  return true;
}

/**
 * 用户名验证
 * @date   2019-07-02
 * @return {[type]}   [description]
 */
export function checkUsername(value) {
  if (!(/^[a-zA-Z0-9_-]{1,32}$/.test(value))) {
    return false;
  }
  return true;
}