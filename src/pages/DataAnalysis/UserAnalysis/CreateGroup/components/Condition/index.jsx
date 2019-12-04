import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Input,
	Button,
	Loading,
	Icon,
	Select,
	CascaderSelect,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	firstColumn,
	opMap,
} from './config';

const commonStyle = {
	minWidth: '200px',
};

export default function Condition({
	conditionChange,
}) {
	const [loading, setLoading] = useState(false);
	const [metricData, setMetricData] = useState([]);
	const [originData, setOriginData] = useState([]);
	const [variableData, setVariableData] = useState([]);
	const [combination, setCombination] = useState('');
	const [steps, setSteps] = useState([]);
	const refVariable = useRef({
		id: 0,
		steps: [],
	});

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getOriginData().then((res) => {
					setOriginData(model.assembleOriginData_1(res.data));
				})

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

	function assembleAllEventData(data) {
		const {
			metrics,
			variables,
			dimensions
		} = model.assembleAllEventData_2(data);
		setVariableData(variables);
		setMetricData(metrics);
	}

	useEffect(() => {
		if (metricData.length === 0) {
			return;
		}
		setSteps([createStep()]);
	}, [metricData, variableData, originData]);

	useEffect(() => {
		function onChangeCombination() {
			let temp = '';
			steps.forEach((item, index) => {
				let str = '';
				item.step.forEach((v, index) => {
					if (item.step.length - 1 !== index) {
						str += v.alias + ' or ';
					} else {
						str += v.alias;
					}
				})
				if (item.step.length > 1) {
					temp += `(${str})`;
				} else {
					temp += str;
				}

				if (index !== steps.length - 1) {
					temp += ` ${item.op.toLowerCase()} `
				}
			});
			return temp;
		}
		if (steps.length === 0) {
			return;
		}
		steps.map(item => {
			item.step.map(v => {
				v.refForm.store.setValues(v.values);
			});
		});
		const expre = onChangeCombination();
		setCombination(expre);
		refVariable.current.steps = steps;
		conditionChange(steps, expre);
	}, [steps]);

	const notFoundContent = flag => {
		let word = '';
		switch (flag) {
			case 1:
				word = '加载中...';
				break;
			case 2:
				word = '获取数据失败';
				break;
			case 3:
				word = '没有可用数据';
				break;
		}
		return <span>{word}</span>;
	};

	function createData() {
		return {
			key: refVariable.current.id++,
			values: {
				flag: 'true,event',
				id: metricData[0] && metricData[0].value,
				op: '=',
				values: '1',
				value: '',
				date: 'day:0',
				aggregator: variableData[0] && variableData[0].value,
			},
			filters: [],
			onChange: function(e) {
				const id = this.values.id;
				Object.assign(this.values, e);					
				if (e.id===id && e.flag.includes('event')) {
					conditionChange(refVariable.current.steps);
					return;
				}
				if (this.filters.length === 0) {
					conditionChange(refVariable.current.steps);
					return;
				}
				this.filters = [];
				setSteps(pre => [...pre]);
			},
			onFocus: function(formCore) {
				const id= formCore.getFieldValue('id');
				if (!id) {
					return;
				}
				api.getOriginDataValues({
					id: id.split(',')[1],
				}).then((res) => {
					console.log(res);
					formCore.setFieldProps('value', {
						dataSource: model.assembleOriginDataValues(res.data),
					});
				}).catch(e => {
					console.error(e);
				});
			},
			dateChange: function(e){
				this.values.date=e;
			},
			onFocus_1: function(formCore) {
				if (!this.values.id) {
					return;
				}
				formCore.setFieldProps('aggregator', {
					notFoundContent: notFoundContent(1),
				});
				api.getEventDetails({
					id: this.values.id.split(',')[1],
				}).then((res) => {
					formCore.setFieldProps('aggregator', {
						dataSource: model.assembleEventVaribleData_3(res.bind_variables),
						notFoundContent: notFoundContent(3),
					});
				}).catch(e => {
					formCore.setFieldProps('aggregator', {
						notFoundContent: notFoundContent(2),
					});
					console.error(e);
				});
			},
			onAddFilter: function(e) {
				if(!this.values.flag.includes('event')){
					return;
				}
				if (this.filters.length === 4) {
					model.log('最多支持4条过滤！');
					return;
				}
				this.filters.push(createFilter({}));
				setSteps(pre => [...pre]);
			},
			onDeleteFilter: function(index) {
				this.filters.splice(index, 1);
				setSteps(pre => [...pre]);
			},
			onFocus_2: function(formCore) {
				if (!this.values.id) {
					return;
				}
				formCore.setFieldProps('key', {
					notFoundContent: notFoundContent(1),
				});
				api.getEventDetails({
					id: this.values.id.split(',')[1],
				}).then((res) => {
					formCore.setFieldProps('key', {
						dataSource: model.assembleEventVaribleData_4(res.bind_variables),
						notFoundContent: notFoundContent(3),
					});
				}).catch(e => {
					console.error(e);
					formCore.setFieldProps('key', {
						notFoundContent: notFoundContent(2),
					});
				});
			},
			onFocus_3: function(formCore) {
				const key = formCore.getFieldValue('key');
				if(!key){
					return;
				}
				api.getEventVariableValues({
					id: key.split(',')[1],
				}).then((res) => {
					formCore.setFieldProps('value', {
						dataSource: res.enums.map(item=>item.value),
					});
				}).catch(e => {
					console.error(e);
				});
			},

			effects: [{
				field: 'flag',
				handler: function(formCore) {
				    let idDataSource = originData;
					let opDataSource = model.strOperators;
					let visibleValues = false;
					let visibleValue = true;
					let visibleDe = false;
					let visibleAggregator=false;
					const flag = formCore.getFieldValue('flag');
					const flags= ['true,event','false,event'];
					if (flags.includes(flag)) {
						idDataSource = metricData;
						opDataSource = model.numOperators;
						visibleValues = true;
						visibleValue = false;
						visibleDe = true;
						visibleAggregator=true;
					}
					formCore.setFieldProps('id', {
						dataSource: idDataSource,
					})
					formCore.setFieldValue('id', idDataSource[0] && idDataSource[0].value);
					formCore.setFieldProps('op', {
						dataSource: opDataSource,
					})
					formCore.setFieldProps('values', {
						visible: visibleValues,
					})
					formCore.setFieldProps('value', {
						visible: visibleValue,
					});
					formCore.setFieldProps('de', {
						visible: visibleDe,
					});
					formCore.setFieldProps('aggregator', {
						visible: visibleAggregator,
					});
				},
			}, {
				field: 'id',
				handler: function(formCore) {
					const flag = formCore.getFieldValue('flag');
					if (flag === 'true,event' || flag === 'false, event') {
						formCore.setFieldProps('aggregator', {
							dataSource: variableData,
						});
						formCore.setFieldValue('aggregator', variableData[0].value);
						return;
					}
					formCore.setFieldValue('value', '');
				}
			}],
		}
	}

	function createStep() {
		return {
			key: refVariable.current.id++,
			op: 'AND',
			step: [createData()],
			onChangeOp: function() {
				this.op = this.op === 'AND' ? 'OR' : 'AND';
				setSteps(pre => [...pre]);
			},
			onAddOrFilter: function() {
				if (this.step.length > 3) {
					model.log('目前最多支持4条');
					return;
				}
				this.step.push(createData());
				setSteps(pre => [...pre]);
			},
		}
	}

	function createFilter({
		values = {},
	}) {
		return {
			key: refVariable.current.id++,
			values,
			onChange: function(e) {
				if (!this.values.key) {
					this.refForm.store.setFieldProps('op', {
						disabled: false,
					});
					this.refForm.store.setFieldProps('value', {
						disabled: false,
					});
				}
				Object.assign(this.values, e);
				conditionChange(refVariable.current.steps);
			},
		};
	}

	const onAddAndFilter = () => {
		if (steps.length > 3) {
			model.log('目前最多支持4条');
			return;
		}
		setSteps((pre) => {
			return [...pre, createStep(pre.length)];
		});
	}

	const onDelete = (index, index_1) => {
		if (steps.length === 1 && steps[0].step.length === 1) {
			model.log('第一条规则不能删除！');
			return;
		}
		setSteps(pre => {
			if (pre[index].step.length === 1) {
				pre.splice(index, 1);
			} else {
				pre[index].step.splice(index_1, 1);
			}
			return [...pre];
		});
	};

	const displayRender = labelPath => {
		return <span>{labelPath.join('')}</span>;
	};

	const renderForm = (item, index, index_1, alias, length) => {
		const {
			onChange,
			effects,
			onFocus,
			key,
			dateChange,
			onFocus_1,
			onAddFilter,
			onDeleteFilter,
			filters,
			onFocus_2,
			onFocus_3,
		} = item;
		item.alias = length === 1 ? alias : `${alias}${index_1+1}`;
		return (
			<div key={key}>
				<Form
					ref={e=>{item.refForm = e}}
					onChange={onChange.bind(item)}
					effects={effects}
				>	
				{formCore=>(
					<div className={styles.item}>
						<span className={styles.name}>{item.alias}</span>
						<Field name='flag'>
							<Select style={{minWidth:'120px'}} dataSource={firstColumn} />
						</Field>
						<Field name='id'>
							<Select style={{minWidth:'200px'}} dataSource={metricData} showSearch />
						</Field>
						<Field name='de' >
							<span style={{marginLeft: '10px',marginRight: '10px'}}>的</span>
						</Field>
						<Field name='aggregator' >
				 			<CascaderSelect 
				 				style={commonStyle} 
				 				listStyle={commonStyle} 
				 				dataSource={variableData} 				 			
				 				displayRender={displayRender}
				 				onFocus={onFocus_1.bind(item,formCore)}
				 				showSearch
		 					/>
				 		</Field> 	
						<Field name='op'>
							<Select style={{minWidth:'120px'}} dataSource={model.numOperators} showSearch />
						</Field>
						<Field name='values'>
							<Input style={{width:'80px'}} htmlType="number" />
						</Field>
						<Field visible={false} name='value'>
							<Select.AutoComplete style={{minWidth:'150px'}} dataSource={[]} onFocus={onFocus.bind(item,formCore)} />
						</Field>
						<Components.DateFilter filterChange={dateChange.bind(item)} />
					  	<span style={{marginLeft: '20px'}}>
			              	<Button size='small' style={{marginRight:'4px',borderRadius:'50%'}} onClick={onAddFilter.bind(item)}>+</Button>
			              	<span>筛选条件</span>
			              	<Button size='small' style={{marginLeft:'10px',borderRadius:'50%'}} onClick={onDelete.bind(this,index,index_1)}>x</Button>
		            	</span>
					</div>
				)}
				</Form>
				<div style={{marginLeft:'60px',marginTop:'10px'}}>
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
													onFocus={onFocus_2.bind(item,formCore)}
													style={commonStyle} 
													dataSource={[]}  
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
												<Select.AutoComplete style={{minWidth:'120px'}} dataSource={[]} onFocus={onFocus_3.bind(item,formCore)} />
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
		);
	}

	const renderStep = () => {
		return steps.map((item, index) => {
			item.alias = opMap[index];
			return (
				<div key={item.key}>
					<div className={styles.step}>
						{
							item.step.map((v, index_1) => {
								return renderForm(v,index,index_1,item.alias,item.step.length);
							})
						}
						<Button className={styles.filter} onClick={item.onAddOrFilter.bind(item)} >
							<Icon type='add' size='small' className={styles.icon} /> 
							<span>OR</span> 
						</Button>
					</div>
					{(steps.length-1)!==index && <p style={{display:'flex',justifyContent:'center'}}><Button style={{borderRadius:'20px'}} onClick={item.onChangeOp.bind(item)}>{item.op}</Button></p>}
				</div>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<IceContainer>
				<div className={styles.combination}>{combination}</div>
				{renderStep()}
				<Button className={styles.filter} onClick={onAddAndFilter}>
					<Icon type='add' size='small' className={styles.icon} />
					<span>AND</span>
				</Button>
			</IceContainer>
		</Loading>
	);
}