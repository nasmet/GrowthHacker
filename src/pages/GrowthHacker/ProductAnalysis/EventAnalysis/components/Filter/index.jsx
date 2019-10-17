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
	let metricData = [];
	let dimensionsData = [];
	let targetUser = [];
	const formRef = useRef(null);

	useEffect(() => {

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
		metricData = metrics;
		dimensionsData = dimensions;
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
		targetUser = targets;
	}

	const formChange = (values) => {
		const {
			dimensions,
			metrics,
			segmentation_id,
		} = values;
		let flag = true;
		if (dimensions && dimensions.length > 0 && metrics && metrics.length > 0 && segmentation_id && segmentation_id !== '') {
			flag = false;
		}
		filterChange(values, flag);
	};


	const onFocus = () => {
		if (metricData.length === 0) {
			api.getDataCenter().then((res) => {
				dividingData(res.event_entities);
			});
		}
	};

	const onSegmentationFocus = () => {
		if (targetUser.length === 0) {
			api.getUserGroups().then((res) => {
				dividingTargetData(res.segmentations);
			});
		}
	}

	const notFoundContent = <span>加载中...</span>;

	return (
		<Form 
			className={styles.wrap} 
			onChange={formChange} 
			layout={{labelAlign: 'top',labelTextAlign: 'left'}}
			ref={formRef}
		>	
			<Field label='选择事件' name='metrics'>
				<Select  
					style={{width:'400px'}}
					mode="multiple"
					dataSource={[]}  
					showSearch
					onFocus={onFocus}
					notFoundContent={notFoundContent}
				/>
			</Field>
			<Field label='按以下维度拆分' name='dimensions'>
				<Select  
					style={{width:'400px'}}
					mode="multiple"
					dataSource={[]}  
					showSearch
					onFocus={onFocus}
					notFoundContent={notFoundContent}
				/>
			</Field>
			<Field label='目标用户' name='segmentation_id'>
				<Select  
					style={{width:'400px'}}
					dataSource={[]} 
					showSearch
					onFocus={onSegmentationFocus}
					notFoundContent={notFoundContent}
				/>
			</Field>
		</Form>
	);
}