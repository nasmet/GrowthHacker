import React, {
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Loading,
	Select,
	DatePicker,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';

import styles from './index.module.scss';
import {
	rules,
	originRules,
	firstColumn,
} from './stepConfig';

export default function Step({
	condition_expr,
	conditions,
}) {
	const [loading, setLoading] = useState(false);
	const [metricData, setMetricData] = useState([]);
	const [originData, setOriginData] = useState([]);
	const [steps, setSteps] = useState([]);

	useEffect(() => {
		async function getDataCenter() {
			setLoading(true);
			try {
				await api.getDataCenter().then((res) => {
					dividingData(res.event_entities);
				})

				await api.getOriginData().then((res) => {
					setOriginData(res.data.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					}));
				})
			} catch (e) {
				model.log(e);
			}
			setLoading(false);
		}

		getDataCenter();

		return () => {
			api.cancelRequest();
		};
	}, []);

	useEffect(() => {
		function assembleSteps() {
			const steps = [];
			let step = [];
			const opChars = [];
			const valueChars = [];
			const arr = condition_expr.split(' ');

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
				const values = { ...item,
					op: '=',
				};
				values.date = model.transformDate(values.date);
				values.flag = `${values.flag},${values.type}`;
				let idData = [];
				let opData = [];
				let valueShow = false;
				let valuesShow = false;
				if (values.type === 'event') {
					idData = metricData;
					opData = rules;
					valuesShow = true;
					values.values = values.values[0];
				} else {
					opData = originRules;
					idData = originData;
					valueShow = true;
					values.value = values.values[0];
				}
				delete values['type'];
				delete values['alias'];
				step.push({
					values,
					alias,
					idData,
					opData,
					valueShow,
					valuesShow,
				});
			}

			function addStep(opChar) {
				steps.push({
					op: opChar && opChar.toUpperCase(),
					step,
				});
				step = [];
			}

			arr.forEach(item => {
				if (item === 'and' || item === 'or' || item.includes('(') || item.includes(')')) {
					opChars.push(item);
				} else {
					valueChars.push(item);
				}
			});

			while (opChars.length > 0) {
				const opChar = opChars.shift();
				if (opChar === 'and' || opChar === 'or') {
					const valueChar = valueChars.shift();
					createStep(valueChar)
					addStep(opChar);
					step = [];
				} else if (opChar.includes('(')) {
					createStep(opChar.split('(')[1]);
					while (opChars.length > 0) {
						const opChar = opChars.shift();
						if (opChar.includes(')')) {
							createStep(opChar.split(')')[0]);
							addStep(opChars.shift());
							step = [];
							break;
						}
					}
				}
			}

			if (valueChars.length > 0) {
				createStep(valueChars[0]);
				addStep('and');
			}

			return steps;
		}
		if (originData.length === 0) {
			return;
		}
		setSteps(assembleSteps());
	}, [metricData, originData, conditions, condition_expr]);

	useEffect(() => {
		if (steps.length === 0) {
			return;
		}
		steps.map(item => {
			item.step.map(v => {
				v.refForm.store.setValues(v.values, true);
			})
		})
	}, [steps]);

	function dividingData(data) {
		const metrics = [];
		data.forEach((item) => {
			const {
				id,
				name,
			} = item;
			const obj = {
				label: name,
				value: id.toString(),
			};
			if (item.type === 'event') {
				metrics.push(obj);
			}
		});
		setMetricData(metrics);
	}

	const renderForm = (item) => {
		const {
			alias,
			idData,
			opData,
			values,
			valueShow,
			valuesShow,
		} = item;
		return (
			<Form
				key={alias}
				ref={e=>{item.refForm = e}}
				effects={[{
					field: 'id',
					handler: function(formCore) {
						api.getOriginDataValues({
							id: formCore.getFieldValue('id'),
						}).then((res) => {
							formCore.setFieldProps('value', {
								dataSource: res.data.map(item => item.value),
							});
							formCore.setFieldValue('value', values.value);
						});
					},
				}]}
			>	
				<div className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>{alias}</span>
						<Field name='flag'>
							<Select style={{width:'120px'}} dataSource={firstColumn} />
						</Field>
						<Field name='id'>
							<Select style={{width:'200px'}} dataSource={idData} showSearch />
						</Field>
						<Field name='op' dataSource={opData} component={Select} />
						<Field name='values' visible={valuesShow}>
							<Input style={{width:'80px'}} htmlType="number" innerAfter={<span>次</span>} />
						</Field>
						<Field visible={valueShow} name='value'>
							<Select style={{width:'150px'}} dataSource={[]} />
						</Field>
						<Field name='date'>
							<DatePicker.RangePicker 
								style={{width:'120px'}} 
								hasClear={false}
								disabledDate={model.disabledDate} 
							/>
						</Field>
					</div>
				</div>
			</Form>
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
					{(steps.length-1)!==index && <p style={{display:'flex',justifyContent:'center'}}>{item.op}</p>}
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