import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	Select,
	Loading,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Filter({
	filterChange,
}) {
	const formRef = useRef(null);
	const [loading, setLoading] = useState(false);
	const [groupData, setGroupData] = useState([]);
	const [metricData, setMetricData] = useState([]);
	const [dimensionData, setDimensionData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getDataCenter().then((res) => {
					dividingData(res.event_entities);
				});

				await api.getUserGroups().then((res) => {
					dividingGroupData(res.segmentations);
				});
			} catch (e) {
				model.log(e);
			}
			setLoading(false);
		}

		fetchData();

		return () => {
			api.cancelRequest();
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
		formRef.current.state.store.setFieldProps('metrics', {
			dataSource: metrics,
		});
		formRef.current.state.store.setFieldProps('dimensions', {
			dataSource: dimensions,
		});
	}

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
		formRef.current.state.store.setFieldProps('segmentation_id', {
			dataSource: targets,
		});
	}

	const formChange = (values) => {
		const {
			dimensions,
			metrics,
			segmentation_id,
		} = values;
		let flag = true;
		if (dimensions && dimensions.length > 0 && metrics && metrics.length > 0 && segmentation_id !== undefined) {
			flag = false;
		}
		filterChange(values, flag);
	};

	return (
		<Loading visible={loading} inline={false}>
			<Form 
				className={styles.wrap} 
				onChange={formChange} 
				ref={formRef}
				renderField={({label, component, error}) => (
		            <div className={styles.field}>
		              	<span style={{marginBottom: '4px'}}>{label}</span>
		              	<span>{component}</span>
		            </div>
		        )}
			>	
				<Field label='选择事件' name='metrics'>
					<Select  
						style={{width:'400px'}}
						mode="multiple"
						dataSource={[]}  
						showSearch
					/>
				</Field>
				<Field label='按以下维度拆分' name='dimensions'>
					<Select  
						style={{width:'400px'}}
						mode="multiple"
						dataSource={[]}  
						showSearch
					/>
				</Field>
				<Field label='目标用户' name='segmentation_id'>
					<Select  
						style={{width:'400px'}}
						dataSource={[]} 
						showSearch
					/>
				</Field>
			</Form>
		</Loading>
	);
}