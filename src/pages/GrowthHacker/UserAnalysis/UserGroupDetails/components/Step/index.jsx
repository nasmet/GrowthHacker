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
		async function fetchData() {
			setLoading(true);
			try {
				await api.getDataCenter({
					type: 'event',
				}).then((res) => {
					setMetricData(model.assembleEvent(res.event_entities));
				})

				await api.getOriginData().then((res) => {
					setOriginData(model.assembleOriginData(res.data));
				})
			} catch (e) {
				model.log(e);
			}
			setLoading(false);
		}

		fetchData();
	}, []);

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
				return {
					alias,
					step: [{
						values,
						alias,
						idData,
						opData,
						valueShow,
						valuesShow,
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
		if (originData.length === 0) {
			return;
		}
		setSteps(assembleSteps());
	}, [metricData, originData]);

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