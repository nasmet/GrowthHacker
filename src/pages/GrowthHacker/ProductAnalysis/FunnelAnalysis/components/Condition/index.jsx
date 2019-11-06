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
	Input,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';
import {
	operators,
	variables,
} from './config';

const commonStyle = {
	minWidth: '200px',
};

export default function Condition({
	conditionChange,
	initCondition,
}) {
	const [loading, setLoading] = useState(false);
	const [eventData, setEventData] = useState([]);
	const [steps, setSteps] = useState([]);
	const refForm = useRef(null);
	const refVariable= useRef({
		values:{
			segmentation_id: initCondition.segmentation_id,
		},
		id: 0,
	});

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getUserGroups().then((res) => {
					assembleGroupData(res.segmentations);
				});

				await api.getDataCenter().then((res) => {
					assembleEventData(res.event_entities);
				});
			} catch (e) {
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
		const {
			metrics,
			dimensions,
		} = model.assembleEventData_1(data);
		setEventData(metrics);
	}

	function assembleGroupData(data){
		const groups=model.assembleGroupData(data);
		refForm.current.state.store.setFieldProps('segmentation_id', {
			dataSource: groups,
		});
		refForm.current.state.store.setFieldValue('segmentation_id', initCondition.segmentation_id);
	}
	
	function assembleSteps(){
		return initCondition.steps.map(item=>{
			const {
				aggregator,
				event_id,
				event_key,
				filter,
			} = item;
			const step = createStep({event:`${event_key},${event_id}`,aggregator});
			step.filters = filter.conditions.map(item=>(
				createFilter({
					values: {	
						key: item.key,
						op: item.op,
						value: item.values[0],
					},
				})
			));
			return step;
		});
	}

	useEffect(() => {
		if (eventData.length === 0) {
			return;
		}
		if(initCondition.steps.length===0){
			setSteps([createStep(),createStep()]);
		}else{
			setSteps(assembleSteps());
		}
	}, [eventData]);

	useEffect(() => {
		conditionChange(steps, refVariable.current.values);
	}, [steps]);
	
	function createStep(values = {
		event: eventData[0] && eventData[0].value,
	}) {
		return {
			key: refVariable.current.id++,
			values,
			filters: [],
			onChange: function(e) {
				Object.assign(this.values, e);
				this.filters= [];
				setSteps(pre=>[...pre]);
			},
			onFocus: function(formCore) {
				if (!values.event) {
					return;
				}
				formCore.setFieldProps('key', {
					notFoundContent: notFoundContent(1),
				});
				api.getEventDetails({
					id: values.event.split(',')[1],
				}).then((res) => {
					const data = model.assembleEventVaribleData_1(res.bind_variables);
					formCore.setFieldProps('key', {
						dataSource: data,
						notFoundContent: notFoundContent(3),
					});
				}).catch(e=>{
					console.error(e);
					formCore.setFieldProps('key', {
						notFoundContent: notFoundContent(2),
					});
				});
			},
			onAddFilter: function(e) {
				if (this.filters.length === 4) {
					model.log('最多支持4条过滤！');
					return;
				}
				this.filters.push(createFilter({
					values: {
						op: '=',
					}
				}));
				setSteps(pre => [...pre]);
			},
			onDeleteFilter: function(index) {
				this.filters.splice(index, 1);
				setSteps(pre => [...pre]);
			},
		};
	}

	function createFilter({
		values = {},
	}) {
		return {
			key: refVariable.current.id++,
			values,
			onChange: function(e) {
				Object.assign(this.values, e);
			},
		};
	}

	const onAddStep = () => {
		if (steps.length === 4) {
			model.log('最多选择4个事件！');
			return;
		}
		setSteps((pre) => {
			return [...pre, createStep()];
		});
	};

	const notFoundContent = flag =>{
		let word= '';
		switch(flag){
			case 1: 
				word='加载中...';
				break;
			case 2: 
				word='获取数据失败';
				break;
			case 3: 
				word='没有可用数据';
				break;
		}	
		return <span>{word}</span>;
	};
	
	const onDeleteStep=index=>{
		if(steps.length===2){
			model.log('前两条不支持删除！');
			return;
		}
		setSteps(pre=>{
			pre.splice(index,1);
			return [...pre];
		})
	};

	const renderStep = () => {
		return steps.map((item, index) => {
			const {
				key,
				values,
				onChange,
				filters,
				onFocus,
				onAddFilter,
				onDeleteFilter,
			} = item;

			return (
				<div key={key} style={{marginBottom:'20px',borderBottom:'1px solid #e6e6e6'}}>
					<Form 
						initialValues={values}
						onChange={onChange.bind(item)}
						renderField={({label, component, error}) => (
			           		<span>{component}</span>
				        )}
					>
						<span style={{marginRight: '10px',fontWeight: 'bold'}}>{index+1}</span>
						<Field name='event'>
							<Select
								style={commonStyle} 
								dataSource={eventData}  
								showSearch
							/>
						</Field>
			            <span style={{marginLeft: '20px'}}>
			              	<Button size='small' style={{marginRight:'4px',borderRadius:'50%'}} onClick={onAddFilter.bind(item)}>+</Button>
			              	<span>筛选条件</span>
			              	<Button size='small' style={{marginLeft:'10px',borderRadius:'50%'}} onClick={onDeleteStep.bind(this,index)}>x</Button>
		            	</span>
					</Form>
					<div style={{marginLeft:'40px',marginTop:'10px'}}>
						{filters.map((v,index)=>{
							const {
								key,
								values,
								onChange,
							} = v;
							
							return (
								<div key={key}>
									<Form										
										initialValues={values}									
										onChange={onChange.bind(v)}
										renderField={({label, component, error}) => (
								        	<span style={{marginRight:'20px'}}>{component}</span>
								        )}
								        style={{display:'flex',marginBottom:'10px'}}						        
									>
										{formCore=>(
											<div>
												<Field name='key'>
													<Select
														onFocus={onFocus.bind(item,formCore)}
														style={commonStyle} 
														dataSource={[]}  
														showSearch
														placeholder= '请选择关联变量'
													/>
												</Field>
												<Field name='op'>
													<Select
														style={{width:'120px'}} 
														dataSource={operators}  
													/>
												</Field>
												<Field name='value'>
													<Input placeholder= '请输入值' />
												</Field>
								              	<Button size='small' style={{marginLeft:'10px',borderRadius:'50%'}} onClick={onDeleteFilter.bind(item,index)}>x</Button>
											</div>
										)}
									</Form>
								</div> 
							)
						})}
					</div>
				</div>
			)
		});
	};

	const formChange = (values) => {
		Object.assign(refVariable.current.values,values)
		conditionChange(steps,refVariable.current.values);
	};

	return (
		<div>
			<Loading visible={loading} inline={false}>
				<div>
					<Form 
						onChange={formChange} 
						ref={refForm}
						renderField={({label, component, error}) => (
				            <div className={styles.field}>
				              	<span style={{minWidth: '120px'}}>{label}</span>
				              	<span>{component}</span>
				            </div>
				        )}
					>	
						<Field label='目标用户' name='segmentation_id'>
							<Select  
								style={commonStyle}
								dataSource={[]} 
								showSearch
							/>
						</Field>
					</Form>
				</div>
				<div className={styles.wrap}>
					<span>漏斗步骤</span>
					<Button size='small' style={{marginLeft:'4px',borderRadius:'50%'}} onClick={onAddStep}>+</Button>
				</div>										
				{renderStep()}
			</Loading>
		</div>
	);
}