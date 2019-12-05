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

const commonStyle = {
	minWidth: '200px',
};

export default function Condition({
	conditionChange,
	initCondition,
}) {
	const [loading, setLoading] = useState(false);
	const [eventData, setEventData] = useState([]);
	const [dimensionData, setDimensionData] = useState([]);
	const [steps, setSteps] = useState([]);
	const refForm = useRef(null);
	const refVariable= useRef({
		values:{
			segmentation_id: initCondition.segmentation_id,
		},
		id: 0,
		steps,
		variablesMap: {},
	});

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getUserGroups().then((res) => {
					assembleGroupData(res.segmentations);
				});

				await api.getDataCenter().then((res) => {
					assembleAllEventData(res.event_entities);
				});
			} catch (e) {
				model.log(e);
			}
			setLoading(false);
		}

		fetchData();
	}, []);
	
	function assembleAllEventData(data){
		const {
			dimensions,
			metrics,
			variablesMap,
		} = model.assembleAllEventData_1(data);
		setDimensionData(dimensions);
		setEventData(metrics);
		refVariable.current.variablesMap = variablesMap;
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
	}, [eventData,dimensionData]);

	useEffect(() => {
		refVariable.current.steps= steps;
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
				if(this.filters.length!==0){
					this.filters= [];
					setSteps(pre=>[...pre]);
				}else{
					conditionChange(refVariable.current.steps, refVariable.current.values);
				}	
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
				if (this.filters.length === 10) {
					model.log('最多支持10条过滤！');
					return;
				}
				this.filters.push(createFilter({}));
				setSteps(pre => [...pre]);
			},
			onDeleteFilter: function(index) {
				this.filters.splice(index, 1);
				setSteps(pre => [...pre]);
			},
			onFocus_1: function(formCore) {
				const key = formCore.getFieldValue('key');
				if(!key){
					return;
				}
				api.getEventVariableValues({
					id: refVariable.current.variablesMap[key],
				}).then((res) => {
					formCore.setFieldProps('value', {
						dataSource: res.enums.map(item=>item.value),
					});
				}).catch(e => {
					console.error(e);
				});
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
				if(!this.values.key){
					this.refForm.store.setFieldProps('op', {
						disabled: false,
					});
					this.refForm.store.setFieldProps('value', {
						disabled: false,
					});
				}
				Object.assign(this.values, e);
				conditionChange(refVariable.current.steps, refVariable.current.values);
			},
		};
	}

	const onAddStep = () => {
		if (steps.length === 10) {
			model.log('最多选择10个事件！');
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
				onFocus_1,
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
										ref={e=>{v.refForm=e}}								
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
														dataSource={dimensionData}  
														showSearch
														placeholder= '请选择关联变量'
													/>
												</Field>
												<Field name='op' disabled={values.op?false:true}>
													<Select
														style={commonStyle} 
														dataSource={model.allOperators}  
													/>
												</Field>
												<Field name='value' disabled={values.value?false:true}>
													<Select.AutoComplete style={{minWidth:'120px'}} dataSource={[]} onFocus={onFocus_1.bind(item,formCore)} />
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
		conditionChange(refVariable.current.steps, refVariable.current.values);
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