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
import {originRules} from './filterConfig';

export default function Filter({
	filterChange,
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

		setSteps([createBehavior('init_event','初始行为是'),createBehavior('retention_event','后续行为是'),createUserBehavior()]);
	},[metricData,groupData,originData]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try{
				await api.getOriginData().then((res) => {
					setOriginData(res.data.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					}));
				});

				await api.getDataCenter().then((res) => {
					dividingMetricData(res.event_entities);
				});

				await api.getUserGroups().then((res) => {
					dividingGroupData(res.segmentations);
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

	function dividingMetricData(data) {
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
		setMetricData(metrics);
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
		setGroupData(targets);
	}

	const notFoundContent = <span>加载中...</span>;

	function createBehavior(name,label) {
		return {
			name,
			label,
			values: {
				[name]:metricData[0]&&metricData[0].value, 
			},
			onChange: function(e) {
				this.values = e;
			},
			filter:[],
			onAddFilter:function(){
				this.filter.push(createFilter());
				setSteps(pre=>[...pre]);
			}
		}
	}


	function createUserBehavior() {
		return {
			values: {
				segmentation_id:0,
			},
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
					const data = res.data.map(item => {
						return {
							label: item.value,
							value: item.id,
						}
					});
					formCore.setFieldProps('value', {
						dataSource: data,
					});
				});
			},
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
								style={{width:'200px'}} 
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
								style={{width:'200px'}} 
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
							} = item;
							
							return ( 
								<Form
									key={key}
									initialValues={values}
									style={{display:'flex',marginBottom:'10px'}}
									onChange={onChange.bind(item)} 
									renderField={({label, component, error}) => (
							        	<span style={{marginRight:'20px'}}>{component}</span>
							        )}
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
											dataSource={originRules}  
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