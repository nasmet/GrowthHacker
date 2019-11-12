import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Loading,
	Select,
	Button,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

export default function Condition({
	conditionChange,
	initCondition,
}) {
	function initSteps(){
		return [createBehavior({name:'init_event',label:'初始行为是',values:{'init_event': ''}}),
				createBehavior({name:'retention_event',label:'后续行为是',values:{'retention_event': ''}}),
				createUserBehavior({'segmentation_id': ''})
		];
	}

	const [loading,setLoading] = useState(false);
	const [originData,setOriginData] = useState([]);
	const [groupData,setGroupData] = useState([]);
	const [metricData,setMetricData] = useState([]);
	const [steps,setSteps] = useState(initSteps());
	
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try{
				await api.getOriginData().then((res) => {
					setOriginData(model.assembleOriginData(res.data));
				});

				await api.getDataCenter({
					type: 'event',
				}).then((res) => {
					setMetricData(model.assembleEvent_1(res.event_entities));
				});

				await api.getUserGroups().then((res) => {
					setGroupData(model.assembleGroupData(res.segmentations));
				});

			}catch(e){
				model.log(e);
			}
			setLoading(false);
		}

		fetchData();
	}, []);

	useEffect(()=>{
		if(groupData.length===0){
			return;
		}
		const init_event = initCondition.init_event || (metricData[0] && metricData[0].value);
		const retention_event = initCondition.retention_event || (metricData[0] && metricData[0].value);
		const segmentation_id = initCondition.segmentation_id;
		steps[0].values.init_event = init_event;
		steps[1].values.retention_event = retention_event;
		steps[2].values.segmentation_id = segmentation_id;

		steps[0].refForm.store.setFieldValue('init_event',init_event);
		steps[1].refForm.store.setFieldValue('retention_event',retention_event);
		steps[2].refForm.store.setFieldValue('segmentation_id',segmentation_id);
		steps[0].refForm.store.setFieldProps('init_event',{dataSource: metricData});
		steps[1].refForm.store.setFieldProps('retention_event',{dataSource: metricData});
		steps[2].refForm.store.setFieldProps('segmentation_id',{dataSource: groupData});

		conditionChange(steps);
	},[metricData,groupData,originData]);

	const notFoundContent = <span>加载中...</span>;

	function createBehavior({name,label,values={}}) {
		return {
			name,
			label,
			values,
			onChange: function(e) {
				this.values = e;
				conditionChange(steps);
			},
			filter:[],
			onAddFilter:function(){
				model.log('暂不支持！');
				// this.filter.push(createFilter());
				// setSteps(pre=>[...pre]);
			}
		}
	}


	function createUserBehavior(values={}) {
		return {
			values,
			onChange: function(e) {
				this.values = e;
				conditionChange(steps);
			},
		}
	}

	function createFilter(){
		return {
			key: Date.now(),
			values: {
				key: originData[0] && originData[0].value,
				op: '=',
				value: '',
			},
			onChange: function(e) {
				this.values = e;
			},
			onFocus: function(formCore){
				if (!this.values.key) {
					return;
				}
				api.getOriginDataValues({
					id: this.values.key,
				}).then((res) => {
					formCore.setFieldProps('value', {
						dataSource: model.assembleOriginDataValues(res.data),
					});
				}).catch(e=>{
					console.log(e);
				});
			},
			effects: [{
				field: 'key',
				handler: function(formCore) {
					formCore.setFieldValue('value', '');
				},
			}],
		};
	}
	
	const renderSteps=()=>{
		return steps.map((item,index)=>{
			const {
				name,
				label,
				onChange,
				filter,
				onAddFilter,
				values,
			}= item;
			if(index===2){
				return( 
					<Form 
						initialValues={values}
						ref={e=>{item.refForm = e}}
						key='segmentation_id'
						onChange={onChange.bind(item)} 
				        renderField={({label, component, error}) => (
				            <div className={styles.field}>
				              	<div style={{width:'100px'}}>{label}</div>
				              	<span>{component}</span>
				            </div>
				        )}
					>
						<Field label='目标用户' name='segmentation_id'>
							<Select  
								style={{width:'300px'}} 
								dataSource={groupData}  
								showSearch
							/>
						</Field>
					</Form>
				);
			}
			return (
				<div key={name} style={{marginBottom:'20px',borderBottom:'1px solid #e6e6e6'}}>
					<Form 
						initialValues={values}
						ref={e=>{item.refForm = e}}
						onChange={onChange.bind(item)} 
						renderField={({label, component, error}) => (
				            <div className={styles.field}>
				              	<div style={{width:'100px'}}>{label}</div>
				              	<span style={{marginRight:'20px'}}>{component}</span>
				              	<Button size='small' style={{marginRight:'4px',borderRadius:'50%'}} onClick={onAddFilter.bind(item)}>+</Button>
				              	<span>筛选条件</span>
				            </div>
				        )}

					>
						<Field label={label} name={name}>
							<Select
								style={{width:'300px'}} 
								dataSource={metricData}  
								showSearch
							/>
						</Field>
					</Form>
					<div style={{marginLeft:'20px',marginBottom:'10px'}}>
						{filter.map(item=>{
							const {
								key,
								onChange,
								onFocus,
								values,
								effects,
							} = item;
							
							return ( 
								<Form
									key={key}
									initialValues={values}									
									onChange={onChange.bind(item)}
									effects={effects}
									renderField={({label, component, error}) => (
							        	<span style={{marginRight:'20px'}}>{component}</span>
							        )}
							        style={{display:'flex',marginBottom:'10px'}}						        
								>
								{formCore=>(
									<div>
									<Field name='key'>
										<Select
											style={{width:'200px'}} 
											dataSource={originData}  
											showSearch
											notFoundContent={notFoundContent}
										/>
									</Field>
									<Field name='op'>
										<Select
											style={{width:'100px'}} 
											dataSource={model.allOperators}  
											showSearch
											notFoundContent={notFoundContent}
										/>
									</Field>
									<Field name='value'>
										<Select
											style={{width:'200px'}} 
											dataSource={[]}  
											showSearch
											notFoundContent={notFoundContent}
											onFocus={onFocus.bind(item,formCore)}
										/>
									</Field>
									</div>
								)}
								</Form>
							)
						})}
					</div>
				</div>
			)
		});
	};


	return (
		<div>
			<Loading visible={loading} inline={false}>
				<div className={styles.title}>
					显示满足如以下行为模式的用户留存情况
				</div>
				{renderSteps()}
			</Loading>
		</div>
	);
}