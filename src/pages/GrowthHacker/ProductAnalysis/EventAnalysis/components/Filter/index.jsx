import React, {
	Component,
	useEffect,
	useState,
	useRef,
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

export default function Filter({
	filterChange,
}) {
	const [values, setValues] = useState({
		dimensions: [],
		metrics: [],
		segmentation_id: '',
	});
	const [loading, setLoading] = useState(false);
	const formRef = useRef(null);
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
				projectId,
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				dividingTargetData(res.segmentations);
			})
		} catch (e) {
			model.log(e);
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
		formRef.current.state.store.setFieldProps('metrics', {
			dataSource: metrics,
		});
		formRef.current.state.store.setFieldProps('dimensions', {
			dataSource: dimensions,
		});
	}

	function dividingTargetData(data) {
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
		filterChange(values);
	};

	return (
		<Loading visible={loading} inline={false} >
			<Form 
				className={styles.wrap} 
				onChange={formChange} 
				initialValues={values} 
				layout={{labelAlign: 'top',labelTextAlign: 'left'}}
				ref={formRef}
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