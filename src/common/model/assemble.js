export function assembleEventData(data) {
	const dimensions = [];
	const metrics = [];
	data.forEach(item => {
		const temp = {
			label: item.name,
			value: item.entity_key,
		};
		if (item.type === 'event') {
			metrics.push(temp);
		} else {
			dimensions.push(temp);
		}
	});

	return {
		dimensions,
		metrics,
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
	return data.map(item => {
		return {
			label: item.value,
			value: item.id,
		}
	})
}

export function assembleTagData(data) {
	return data.map(item => {
		return {
			label: item.name,
			value: item.id,
		}
	})
}