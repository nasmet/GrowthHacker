import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Loading,
	Select,
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
	let targetUser = [];
	let metricData = [];
	const formRef = useRef(null);

	useEffect(() => {

		return () => {
			api.cancelRequest();
		};
	}, []);

	function dividingData(data) {
		const metrics = [];
		data.forEach((item) => {
			if (item.type === 'event') {
				metrics.push({
					label: item.name,
					value: item.entity_key,
				});
			}
		});
		formRef.current.state.store.setFieldProps('init_event', {
			dataSource: metrics,
		});
		formRef.current.state.store.setFieldProps('retention_event', {
			dataSource: metrics,
		});
		metricData = metrics;
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

	const formChange = (e) => {
		const {
			init_event,
			retention_event,
			segmentation_id,
		} = e;
		let flag = true;
		if (init_event && retention_event && segmentation_id !== undefined) {
			flag = false;
		}
		filterChange(e, flag);
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
		<IceContainer>
			<div className={styles.title}>
				显示满足如以下行为模式的用户留存情况
			</div>
			<Form
				ref={formRef}
				onChange={formChange} 
				layout={{labelAlign: 'left',labelTextAlign: 'left',labelCol: 1, wrapperCol: 2}}
			>
				<Field label='初始行为是' name='init_event'>
					<Select
						style={{width:'200px'}} 
						dataSource={[]}  
						showSearch
						onFocus={onFocus}
						notFoundContent={notFoundContent}
					/>
				</Field>

				<Field label='后续行为是' name='retention_event'>
					<Select
						style={{width:'200px'}} 
						dataSource={[]}  
						showSearch
						onFocus={onFocus}
						notFoundContent={notFoundContent}
					/>
				</Field>

				<Field label='目标用户' name='segmentation_id'>
					<Select  
						style={{width:'200px'}} 
						dataSource={[]}  
						showSearch
						onFocus={onSegmentationFocus}
						notFoundContent={notFoundContent}
					/>
				</Field>
			</Form>
		</IceContainer>
	);
}