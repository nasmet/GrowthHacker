import React, {
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Loading,
	Select,
	CascaderSelect,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';
import {
	firstColumn,
} from './stepConfig';

const commonStyle = {
	minWidth: '200px',
};

export default function Step({
	condition_expr,
	conditions,
}) {
	const [loading, setLoading] = useState(false);
	const [metricData, setMetricData] = useState([]);
	const [originData, setOriginData] = useState([]);
	const [dimensionData, setDimensionData] = useState([]);
	const [variableData, setVariableData] = useState([]);
	const [steps, setSteps] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getOriginData().then((res) => {
					setOriginData(model.assembleOriginData_1(res.data));
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

	function assembleAllEventData(data) {
		const {
			metrics,
			variables,
			dimensions
		} = model.assembleAllEventData_2(data);
		setVariableData(variables);
		setMetricData(metrics);
		setDimensionData(dimensions);
	}

	useEffect(() => {
		function assembleSteps() {
			const expArr = model.reversePoland(condition_expr);

			function findCondition(alias) {
				for (let item of conditions) {
					if (item.alias === alias) {
						return item;
					}
				}
				return null;
			}

			function createStep(alias) {
				const item = findCondition(alias);
				const values ={};
				values.flag = `${item.flag},${item.type}`;
				values.date = model.transformDate(item.date);
				values.id = `${item.event_key},${item.event_id}`;
				values.op = item.op;
				let idData = originData;
				let opData = model.strOperators;
				let valueShow = true;
				let valuesShow = false;
				let aggregatorShow = false;
				let deShow = false;
				let filters= [];
				if (item.type === 'event') {
					idData = metricData;
					opData = model.numOperators;
					valuesShow = true;
					valueShow = false;
					deShow = true;
					aggregatorShow=true;
					values.values = item.values[0];
					if(item.field){
						values.aggregator= `${item.field},${item.aggregator}`;
					}else{
						values.aggregator=item.aggregator;
					}
					if(item.filter&&item.filter.conditions&&item.filter.conditions.length>0){
						filters = item.filter.conditions.map(item=>{
							return {
								key: `${item.key},${item.id}`,
								op: item.op,
								value: item.values[0],
							}
						})
					}
					
				} else {
					values.value = item.values[0];
				}			
				return {
					alias,
					step: [{
						values,
						alias,
						idData,
						opData,
						valueShow,
						valuesShow,
						aggregatorShow,
						deShow,
						filters,
					}],
				};

			}

			const steps = [];
			for (let v of expArr) {
				if (v === 'or' || v === 'and') {
					const temp = steps.pop();
					const temp_1 = steps.pop();
					if (temp_1.alias[0] === temp.alias[0]) {
						temp_1.step.push(...temp.step);
						steps.push(temp_1);
					} else {
						temp_1.op = v;
						steps.push(temp_1);
						steps.push(temp);
					}
				} else {
					steps.push(createStep(v));
				}
			}
			return steps;
		}

		if (metricData.length === 0) {
			return;
		}
		setSteps(assembleSteps());
	}, [metricData, dimensionData, variableData, originData]);

	const displayRender = labelPath => {
		return <span>{labelPath.join('')}</span>;
	};

	const renderForm = (item) => {
		const {
			values,
			alias,
			idData,
			opData,
			valueShow,
			valuesShow,
			aggregatorShow,
			deShow,
			filters,
		} = item;

		return (
			<div key={alias}>
				<Form
					initialValues={values}
				>	
					<div className={styles.item}>
						<span className={styles.name}>{alias}</span>
						<Field name='flag'>
							<Select style={{width:'120px'}} dataSource={firstColumn} />
						</Field>
						<Field name='id'>
							<Select style={{width:'200px'}} dataSource={idData} showSearch />
						</Field>
						<Field name='de' visible={deShow} >
							<span style={{marginLeft: '10px',marginRight: '10px'}}>的</span>
						</Field>
						<Field name='aggregator' visible={aggregatorShow} >
				 			<CascaderSelect 
				 				style={commonStyle} 
				 				listStyle={commonStyle} 
				 				dataSource={variableData} 				 			
				 				displayRender={displayRender}
		 					/>
		 				</Field>
						<Field name='op' dataSource={opData} component={Select} />
						<Field name='values' visible={valuesShow}>
							<Input style={{width:'80px'}} htmlType="number" />
						</Field>
						<Field visible={valueShow} name='value'>
							<Select style={{width:'150px'}} dataSource={[]} />
						</Field>
						<Components.DateFilter initTabValue = 'NAN' initCurDateValue={values.date} filterChange={()=>{}} />
					</div>
				</Form>
				<div style={{marginLeft:'60px',marginTop:'10px'}}>
					{filters.map((v,index)=>{						
						return (
							<div key={index}>
								<Form									
									initialValues={v}									
									renderField={({label, component, error}) => (
							        	<span style={{marginRight:'20px'}}>{component}</span>
							        )}
							        style={{display:'flex',marginBottom:'10px'}}						        
								>
									{formCore=>(
										<div>
											<Field name='key'>
												<Select
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
											<Field name='value'>
												<Input placeholder= '请输入值' />
											</Field>							    
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
			return (
				<div key={index}>
					<div className={styles.step}>
						{
							item.step.map((v) => {
								return renderForm(v);
							})
						}
					</div>
					{(steps.length-1)!==index && <p style={{display:'flex',justifyContent:'center'}}>{item.op.toUpperCase()}</p>}
				</div>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<p className={styles.combination}>{condition_expr}</p>
			{renderStep()}
		</Loading>
	);
}