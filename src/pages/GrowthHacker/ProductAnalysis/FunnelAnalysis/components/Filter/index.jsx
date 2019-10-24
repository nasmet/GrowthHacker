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
import styles from './index.module.scss';
import {originRules} from './filterConfig';

export default function Filter({
	filterChange,
}) {
	const [originData,setOriginData] = useState([]);
	const [groupData,setGroupData] = useState([]);
	const [metricData,setMetricData] = useState([]);
	const [steps, setSteps] = useState([]);
	const [loading,setLoading] = useState(false);
	
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

	useEffect(()=>{
		if(groupData.length===0){
			return;
		}

		setSteps([createStep({step: 0}),createStep({step: metricData[0] && metricData[0].value})]);
	},[metricData,groupData,originData]);

	useEffect(()=>{
		filterChange(steps);

	},[steps]);

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

	function createStep(values) {
		return {
			values,
			onChange: function(e) {
				this.values = e;
			},
			filter: [],
			onAddFilter: function() {
				this.filter.push(createFilter());
				setSteps(pre => [...pre]);
			}
		}
	}

	function createFilter() {
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
			onFocus: function(formCore) {
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

	const onAddStep = () => {
		setSteps((pre) => {
			return [...pre, createStep({step: metricData[0] && metricData[0].value})];
		});
	};

	const notFoundContent = <span>加载中...</span>;

	const renderStep = () => {
		return steps.map((item, index) => {
			const {
				onChange,
				onAddFilter,
				filter,
				values,
			} = item;
			if(index === 0){
				return (
					<Form
						key={index}
						initialValues={values}
						onChange={onChange.bind(item)}
						renderField={({label, component, error}) => (
				            <div className={styles.field}>
				              	<div style={{width:'100px'}}>{label}</div>
				              	<span style={{marginRight:'20px'}}>{component}</span>
				            </div>
				        )}
					>	
						<Field label='目标用户' name='step'>
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
				<div key={index} style={{marginBottom:'20px',borderBottom:'1px solid #e6e6e6'}}>
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
					{formCore=>(<Field label={`步骤${index}`} name='step' placeholder="请选择事件">
						<Select  
							style={{width:'200px'}} 
							dataSource={metricData}  
							showSearch
						/>
					</Field>)}
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
								initialValues={values}
								key={key}
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
									/>
								</Field>
								<Field name='op'>
									<Select
										style={{width:'100px'}} 
										dataSource={originRules}  
										showSearch
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
			);
		});
	};

	return (
		<div>	
			<Loading visible={loading} inline={false}>
				{renderStep()}
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type='primary' onClick={onAddStep}>增加步骤</Button>
				</div>
			</Loading>
		</div>
	);
}