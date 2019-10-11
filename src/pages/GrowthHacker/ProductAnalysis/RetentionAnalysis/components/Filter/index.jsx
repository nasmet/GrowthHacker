import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Message,
	Loading,
	Icon,
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
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);
	const [targetUser, setTargetUser] = useState([]);
	const formRef = useRef(null);

	async function fetchData() {
		setLoading(true);
		try {
			await api.getDataCenter().then((res) => {
				dividingData(res.event_entities);
			});
			await api.getUserGroups().then((res) => {
				dividingTargetData(res.segmentations);
			})
		} catch (e) {
			model.log(e);
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchData();
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
		formRef.current.state.store.setFieldProps('init_event', {
			dataSource: metrics,
		});
		formRef.current.state.store.setFieldProps('retention_event', {
			dataSource: metrics,
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
		targets.splice(0, 0, {
			label: '全部用户',
			value: 0,
		});
		formRef.current.state.store.setFieldProps('segmentation_id', {
			dataSource: targets,
		});
		setTargetUser(targets);
	}

	const formChange = (e) => {
		filterChange(e);
	};

	return (
		<Loading visible={loading} inline={false}>
				<IceContainer>
					<div className={styles.title}>
						显示满足如以下行为模式的用户留存情况
					</div>
					<Form
						ref={formRef}
						onChange={formChange} 
						initialValues={values} 
						layout={{labelAlign: 'left',labelTextAlign: 'left',labelCol: 1, wrapperCol: 2}}
					>
						<Field label='初始行为是' name='init_event'>
							<Select  
								dataSource={[]}  
								showSearch
							/>
						</Field>

						<Field label='后续行为是' name='retention_event'>
							<Select  
								dataSource={[]}  
								showSearch
							/>
						</Field>

						<Field label='目标用户' name='segmentation_id'>
							<Select  
								dataSource={[]}  
								showSearch
							/>
						</Field>
					</Form>
				</IceContainer>
		</Loading>
	);
}