import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Button,
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
	groupChange,
}) {
	const [values, setValues] = useState({});
	const [loading, setLoading] = useState(false);
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);
	const [targetUser, setTargetUser] = useState([]);
	const [steps, setSteps] = useState([]);

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

	useEffect(() => {
		filterChange(steps);
	}, [steps]);

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
		targets.splice(0, 0, {
			label: '全部用户',
			value: 0,
		});
		setTargetUser(targets);
	}

	function createStep() {
		return {
			values: {
				step: metricData[0] && metricData[0].value,
			},
			onChange: function(e) {
				console.log(e);
				this.values = e;
			},
		}
	};

	const onAddStep = () => {
		setSteps((pre) => {
			return [...pre, createStep()];
		});
	};

	const onResetStep = () => {
		setSteps([]);
		setValues({});
		groupChange(0);
	};

	const renderStep = () => {
		return steps.map((item, index) => {
			const {
				values,
				onChange,
			} = item;
			return (
				<Form
					key={index}
					onChange={onChange.bind(item)} 
					initialValues={values} 
					layout={{labelAlign: 'left',labelTextAlign: 'left',labelCol: 1, wrapperCol: 2}}
				>	
					<Field label={`步骤${index+1}`} name='step' placeholder="请选择事件">
						<Select  
							style={{width:'200px'}} 
							dataSource={metricData}  
							showSearch
						/>
					</Field>
				</Form>
			);
		});
	};

	const onChange = (e) => {
		groupChange(e.segmentation_id);
	};

	return (
		<Loading visible={loading} inline={false}>
			<IceContainer>	
				{renderStep()}
				{steps.length>0 && <Form
					onChange={onChange}
					initialValues={{
						segmentation_id:0,
					}}
					layout={{labelAlign: 'left',labelTextAlign: 'left',labelCol: 1, wrapperCol: 2}}
				>	
					<Field label='目标用户' name='segmentation_id'>
						<Select  
							dataSource={targetUser}  
							showSearch
						/>
					</Field>
				</Form>}
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type='primary' onClick={onAddStep}>增加步骤</Button>
					<Button type='primary' onClick={onResetStep}>重置步骤</Button>
				</div>
			</IceContainer>
		</Loading>
	);
}