const timeType = {
  s: 1,
  m: 2,
  h: 3,
};
export function formatTime({
  time,
  from = 'm',
  to = 's',
}) {
  if (!timeType[from] || !timeType[to]) {
    throw new Error('传入的参数有误');
  }
  const diff = timeType[to] - timeType[from];
  return time / Math.pow(60, diff);
}

/**
 * 时间戳格式化
 * @date   2019-07-04
 * @param  {[type]}   unix 时间戳
 * @param  {[type]}   fmt  时间格式  Y-M-D h:m:s
 * @return {string}
 */
export function formatUnix({
  unix,
  fmt,
}) {
  if (!isString(fmt)) {
    throw new Error('传入的参数有误');
  }

  const date = new Date(unix * 1000);
  const map = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  };

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