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
	filterChange,
	initValues,
}) {
	const [loading,setLoading] = useState(false);
	const [originData,setOriginData] = useState([]);
	const [groupData,setGroupData] = useState([]);
	const [metricData,setMetricData] = useState([]);
	const [steps,setSteps] = useState([]);
	
	useEffect(()=>{
		filterChange(steps);

	},[steps]);

	useEffect(()=>{
		if(groupData.length===0){
			return;
		}
		if(initValues.init_event){
			setSteps([
				createBehavior({name:'init_event',label:'初始行为是',values:{init_event:initValues.init_event }}),
				createBehavior({name:'retention_event',label:'后续行为是',values:{retention_event:initValues.retention_event }}),
				createUserBehavior({values:{segmentation_id:initValues.segmentation_id}})]
			);
			return;
		}

		setSteps([
			createBehavior({name:'init_event',label:'初始行为是',values:{init_event: metricData[0] && metricData[0].value }}),
			createBehavior({name:'retention_event',label:'后续行为是',values:{retention_event: metricData[0] && metricData[0].value}}),
			createUserBehavior({values:{segmentation_id:0}})]
		);
	},[metricData,groupData,originData]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try{
				await api.getOriginData().then((res) => {
					const originData = model.assembleOriginData(res.data);
					setOriginData(originData);
				});

				await api.getDataCenter().then((res) => {
					assembleEventData(res.event_entities);
				});

				await api.getUserGroups().then((res) => {
					assembleGroupData(res.segmentations);
				});

			}catch(e){
				model.log(e);
			}
			setLoading(false);
		}

		fetchData();

		return () => {
			api.cancelRequest();
		};
	}, []);

	function assembleEventData(data) {
		const {metrics} = model.assembleEventData(data);
		setMetricData(metrics);
	}

	function assembleGroupData(data) {
		const groups = model.assembleGroupData(data);
		setGroupData(groups);
	}

	const notFoundContent = <span>加载中...</span>;

	function createBehavior({name,label,values={}}) {
		return {
			name,
			label,
			values,
			onChange: function(e) {
				this.values = e;
			},
			filter:[],
			onAddFilter:function(){
				model.log('暂不支持！');
				// this.filter.push(createFilter());
				// setSteps(pre=>[...pre]);
			}
		}
	}


	function createUserBehavior({values}) {
		return {
			values,
			onChange: function(e) {
				this.values = e;
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
					const originDataValues = model.assembleOriginDataValues(res.data);
					formCore.setFieldProps('value', {
						dataSource: originDataValues,
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
											dataSource={config.originRules}  
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