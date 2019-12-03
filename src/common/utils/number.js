export function transformPercent(number) {
	if (number === 0) {
		return number;
	}
	return `${(number*100).toFixed(2)}%`;
}