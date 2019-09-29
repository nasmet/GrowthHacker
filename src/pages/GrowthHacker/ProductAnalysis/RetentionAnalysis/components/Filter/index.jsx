import React, {
	Component,
	useState,
	useEffect,
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
import {
	rules,
} from './filterConfig';

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

	const formChange = (e) => {
		filterChange(e);
	};

	const renderFilter = (event, name = '筛选条件') => {
		return (
			<div className={styles.filter}>
      			<Icon type='add' size='small' className={styles.icon} />
      			<span>{name}</span>
			</div>
		)
	};

	return (
		<Loading visible={loading} inline={false}>
				<IceContainer>
					<div className={styles.title}>
						显示满足如以下行为模式的用户留存情况
					</div>
					{targetUser.length!==0?<Form
						onChange={formChange} 
						initialValues={values} 
						layout={{labelAlign: 'left',labelTextAlign: 'left',labelCol: 1, wrapperCol: 2}}
					>
						<Field label='初始行为是' name='init_event'>
							<Select  
								dataSource={metricData}  
								showSearch
							/>
						</Field>

						<Field label='后续行为是' name='retention_event'>
							<Select  
								dataSource={metricData}  
								showSearch
							/>
						</Field>

						<Field label='目标用户' name='segmentation_id'>
							<Select  
								dataSource={targetUser}  
								showSearch
							/>
						</Field>
					</Form>:null}
				</IceContainer>
		</Loading>
	);
}