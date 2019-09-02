/**
 * 将分格式化元
 * @date   2019-07-01
 * @return {[type]}   [description]
 */
const moneyType = {
  minute: 1,
  yuan: 3,
};

export function formatMoney({
  money,
  from = 'minute',
  to = 'yuan',
}) {
  if (!moneyType[from] || !moneyType[to]) {
    throw new Error('传入的参数有误');
  }

  const diff = moneyType[to] - moneyType[from];
  return +(money / Math.pow(10, diff)).toFixed(1);
}