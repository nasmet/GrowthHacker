export default function reversePoland(expression) {
	const expArr = expression.split(' ');
	const temp = [];
	expArr.forEach(v => {
		if (v.includes('(')) {
			temp.push('(');
			temp.push(v.replace('(', ''));
		} else if (v.includes(')')) {
			temp.push(v.replace(')', ''));
			temp.push(')');
		} else {
			temp.push(v);
		}
	});

	const priority = {
		'(': 2,
		'or': 1,
		'and': 1,
	};

	const opArr = [];
	const valArr = [];

	temp.forEach(v => {
		if (v !== '(' && v !== ')' && v !== 'and' && v !== 'or') {
			valArr.push(v);
			return;
		}
		if (opArr.length === 0) {
			opArr.push(v);
			return
		}
		if (v === ')') {
			while (opArr[opArr.length - 1] !== '(') {
				valArr.push(opArr.pop());
			}
			opArr.pop();
			return;
		}
		if (opArr[opArr.length - 1] === '(') {
			opArr.push(v);
			return;
		}
		if (priority[v] > priority[opArr[opArr.length - 1]]) {
			opArr.push(v);
		} else {
			valArr.push(opArr.pop());
			opArr.push(v);
		}
	});

	for (let op of opArr) {
		valArr.push(op);
	}

	return valArr;
}