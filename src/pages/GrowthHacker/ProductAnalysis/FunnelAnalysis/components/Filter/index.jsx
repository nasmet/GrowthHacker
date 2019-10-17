import React, {
	Component,
	useState,
	useEffect,
	useRef,
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
	let metricData = [];
	let targetUser = [];
	const [steps, setSteps] = useState([createStep()]);
	const formRef = useRef(null);

	useEffect(() => {
		filterChange(steps, formRef.current.store.values.segmentation_id);
	}, [steps])

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
			}
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

	function createStep() {
		return {
			onChange: function(e) {
				let temp = this.values;
				this.values = e;
				if (!temp) {
					filterChange(steps, formRef.current.store.values.segmentation_id);
				}
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
	};

	const onFocus = (formCore) => {
		if (metricData.length === 0) {
			api.getDataCenter().then((res) => {
				dividingData(res.event_entities);
				formCore.setFieldProps('step', {
					dataSource: metricData,
				})
			});
		}
	};

	const notFoundContent = <span>加载中...</span>;

	const renderStep = () => {
		return steps.map((item, index) => {
			const {
				onChange,
			} = item;
			return (
				<Form
					key={index}
					onChange={onChange.bind(item)} 
					layout={{labelAlign: 'left',labelTextAlign: 'left',labelCol: 1, wrapperCol: 2}}

				>	
					{formCore=>(<Field label={`步骤${index+1}`} name='step' placeholder="请选择事件">
						<Select  
							style={{width:'200px'}} 
							dataSource={[]}  
							showSearch
							onFocus={onFocus.bind(this,formCore)}
							notFoundContent={notFoundContent}
						/>
					</Field>)}
				</Form>
			);
		});
	};

	const onChange = (e) => {
		filterChange(steps, e.segmentation_id);
	};

	const onSegmentationFocus = () => {
		if (targetUser.length === 0) {
			api.getUserGroups().then((res) => {
				dividingTargetData(res.segmentations);
			});
		}
	}

	return (
		<IceContainer>	
			{renderStep()}
			<Form
				onChange={onChange}
				ref={formRef}
				layout={{labelAlign: 'left',labelTextAlign: 'left',labelCol: 1, wrapperCol: 2}}
			>	
				<Field label='目标用户' name='segmentation_id'>
					<Select  
						dataSource={targetUser}  
						showSearch
						onFocus={onSegmentationFocus}
						notFoundContent={notFoundContent}
					/>
				</Field>
			</Form>
			<div className={styles.btnWrap}>
				<Button className={styles.btn} type='primary' onClick={onAddStep}>增加步骤</Button>
				<Button type='primary' onClick={onResetStep}>重置步骤</Button>
			</div>
		</IceContainer>
	);
}