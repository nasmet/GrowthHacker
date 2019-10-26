import React, {
	useState,
	useEffect,
} from 'react';
import {
	Select,
} from '@alifd/next';
import styles from './index.module.scss';

export default function GroupFilter({
	filterChange,
}) {
	const [groupData, setGroupData] = useState([]);

	useEffect(() => {
		function fetchData() {
			api.getUserGroups().then((res) => {
				dividingGroupData(res.segmentations);
			}).catch(e => {
				console.error(e);
			});
		}

		fetchData();

		return () => {
			api.cancelRequest();
		};
	}, []);


	function dividingGroupData(data) {
		const targets = data.map((item) => {
			return {
				label: item.name,
				value: item.id,
			};
		});
		targets.splice(0, 0, {
			label: '全部用户',
			value: 0,
		});
		setGroupData(targets);
	}

	const onChange = (e) => {
		filterChange(e);
	};

	return (
		<div className={styles.wrap}>
			<span>目标用户：</span>
			<Select style={{width: '200px'}} defaultValue={0} dataSource={groupData} onChange={onChange} />
		</div>
	);
}