export function assembleEvent(data) {
	return data.map(item => ({
		label: item.name,
		value: item.id,
	}));
}

export function assembleEvent_1(data) {
	return data.map(item => ({
		label: item.name,
		value: item.entity_key,
	}));
}

export function assembleAllEventData_1(data) {
	const dimensions = [];
	const metrics = [];
	data.forEach(item => {
		if (item.type === 'event') {
			metrics.push({
				label: item.name,
				value: `${item.entity_key},${item.id}`,
			});
		} else {
			dimensions.push({
				label: item.name,
				value: item.entity_key,
			});
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
	const variables = [{
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
		if (item.type === 'event') {
			metrics.push({
				label: item.name,
				value: `${item.entity_key},${item.id}`,
			});
		} else {
			dimensions.push({
				label: item.name,
				value: item.entity_key,
			});
			const obj = {
				label: item.name,
				value: item.entity_key,
			};
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
				}]
			}
			variables.push(obj);
		}
	});

	return {
		dimensions,
		metrics,
		variables,
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
		groups.push({
			label: item.name,
			value: item.id,
		})
	});

	return groups;
}

export function assembleOriginData(data) {
	return data.map(item => {
		return {
			label: item.name,
			value: item.id,
		}
	})
}

export function assembleOriginDataValues(data) {
	return data.map(item => item.value);
}

export function assembleTagData(data) {
	return data.map(item => {
		return {
			label: item.name,
			value: item.id,
		}
	})
}

export function assembleEventVaribleData(data) {
	return data.map(item => {
		return {
			label: item.name,
			value: item.id,
		}
	})
}

export function assembleEventVaribleData_1(data) {

	return data.map(item => {
		return {
			label: item.name,
			value: item.entity_key,
		}
	})
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
		const obj = {
			label: item.name,
			value: item.entity_key,
		};
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