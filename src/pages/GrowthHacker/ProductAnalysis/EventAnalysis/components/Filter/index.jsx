import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Grid,
	Select,
	Loading,
	Message,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	Row,
	Col,
} = Grid;

export default function Filter({
	filterChange,
}) {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);
	const [targetUser, setTargetUser] = useState([]);
	let cancelTask = false; // 防止内存泄漏
	const projectId = sessionStorage.getItem('projectId');

	async function fetchData() {
		setLoading(true);
		try {
			await api.getDataCenter().then((res) => {
				if (cancelTask) {
					return;
				}
				dividingData(res.event_entities);
			});
			await api.getUserGroups({
				project_id: projectId,
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				dividingTargetData(res.segmentations);
			})
		} catch (e) {
			Message.success(e.toString());
		}
		if (cancelTask) {
			return;
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchData();

		return () => {
			cancelTask = true;
		};
	}, []);

	function dividingData(data) {
		const dimensions = [];
		const metrics = [];
		data.forEach((item) => {
			const obj = {
				label: item.name,
				value: item.entity_key,
			};
			if (item.type === 'event') {
				metrics.push(obj);
			} else {
				dimensions.push(obj);
			}
		});
		setMetricData(metrics);
		setDimensionData(dimensions);
	}

	function dividingTargetData(data) {
		const targets = data.map((item) => {
			return {
				label: item.name,
				value: item.id,
			};
		});
		setTargetUser(targets);
	}

	const formChange = (values) => {
		filterChange(values);
	};

	return (
		<Loading visible={loading} inline={false} >
			{targetUser.length!==0?<Form 
				className={styles.wrap} 
				onChange={formChange} 
				initialValues={values} 
				layout={{labelAlign: 'top',labelTextAlign: 'left'}}
			>
				<Field label='选择事件' name='metrics'>
					<Select  
						style={{width:'400px'}}
						mode="multiple"
						dataSource={metricData}  
						showSearch
					/>
				</Field>
				<Field label='按以下维度拆分' name='dimensions'>
					<Select  
						style={{width:'400px'}}
						mode="multiple"
						dataSource={dimensionData}  
						showSearch
					/>
				</Field>
				<Field label='目标用户' name='segmentation_id'>
					<Select  
						style={{width:'400px'}}
						dataSource={targetUser} 
						showSearch
					/>
				</Field>
			</Form>:null}
     	</Loading>
	);
}