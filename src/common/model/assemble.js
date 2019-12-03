function createObj(item) {
	return {
		label: item.name,
		value: `${item.entity_key},${item.id}`,
	};
}

function createObj_1(item) {
	return {
		label: item.name,
		value: item.id,
	}
}

function createObj_2(item) {
	return {
		label: item.name,
		value: item.entity_key,
	}
}

export function assembleEvent_1(data) {
	return data.map(item => (createObj_2(item)));
}

export function assembleEventVaribleData_3(data) {
	const temp = [{
		value: 'counter',
		label: '总次数',
	}];
	data.forEach(item => {
		if (item.variable_type === 'string') {
			return;
		}
		const obj = createObj_2(item);
		obj.children = [{
			label: '总和',
			value: `${item.entity_key},sum`,
		}, {
			label: '均值',
			value: `${item.entity_key},average`,
		}, {
			label: '最大值',
			value: `${item.entity_key},max`,
		}, {
			label: '最小值',
			value: `${item.entity_key},min`,
		}];
		temp.push(obj);
	})
	return temp;
}

export function assembleAllEventData_2(data) {
	const dimensions = [];
	const metrics = [];
	const variables = [];
	data.forEach(item => {
		if (item.type === 'event') {
			metrics.push(createObj(item));
		} else {
			dimensions.push(createObj(item));
			variables.push(item);
		}
	});
	return {
		variables: assembleEventVaribleData_3(variables),
		dimensions,
		metrics,
	};
}

export function assembleAllEventData_1(data) {
	const dimensions = [];
	const metrics = [];
	data.forEach(item => {
		if (item.type === 'event') {
			metrics.push(createObj(item));
		} else {
			dimensions.push(createObj_2(item));
		}
	});
	return {
		dimensions,
		metrics,
	};
}

export function assembleAllEventData(data) {
	const dimensions = [];
	const metrics = [];
	const eventBindVariableCache = {};
	const variables = [];
	data.forEach(item => {
		if (item.type === 'event') {
			metrics.push(createObj(item));
			eventBindVariableCache[`${item.entity_key},${item.id}`] = item.bind_variables;
		} else {
			dimensions.push(createObj_2(item));
			variables.push(item);
		}
	});
	return {
		dimensions,
		metrics,
		variables: assembleEventVaribleData_2(variables),
		eventBindVariableCache,
	};
}

export function assembleGroupData(data, all = true) {
	const groups = [];
	if (all) {
		groups.push({
			label: '全部用户',
			value: 0,
		});
	}
	data.forEach(item => {
		groups.push(createObj_1(item));
	});

	return groups;
}

export function assembleOriginData(data) {
	return data.map(item => (createObj_1(item)));
}

export function assembleOriginData_1(data) {
	return data.map(item => {
		return {
			label: item.name,
			value: `${item.key},${item.id}`,
		}
	})
}

export function assembleOriginData_2(data) {
	return data.map(item => {
		return {
			label: item.name,
			value: item.key,
		}
	})
}

export function assembleOriginDataValues(data) {
	return data.map(item => item.value);
}

export function assembleTagData(data) {
	return data.map(item => (createObj_1(item)));
}

export function assembleEventVaribleData(data) {
	return data.map(item => (createObj_1(item)));
}

export function assembleEventVaribleData_1(data) {
	return data.map(item => (createObj_2(item)));
}

export function assembleEventVaribleData_4(data) {
	return data.map(item => (createObj(item)));
}

export function assembleEventVaribleData_2(data) {
	const temp = [{
		value: 'counter',
		label: '总次数',
	}, {
		value: 'unique',
		label: '用户数',
	}, {
		value: 'average',
		label: '人均次数',
	}];
	data.forEach(item => {
		const obj = createObj(item);
		if (item.variable_type !== 'string') {
			obj.children = [{
				label: '总和',
				value: `${item.entity_key},sum`,
			}, {
				label: '均值',
				value: `${item.entity_key},average`,
			}, {
				label: '最大值',
				value: `${item.entity_key},max`,
			}, {
				label: '最小值',
				value: `${item.entity_key},min`,
			}, {
				label: '人均值',
				value: `${item.entity_key},unique_avg`,
			}, {
				label: '去重数',
				value: `${item.entity_key},unique`,
			}]

		} else {
			obj.children = [{
				label: '去重数',
				value: `${item.entity_key},unique`,
			}];
		}
		temp.push(obj);
	})
	return temp;
}