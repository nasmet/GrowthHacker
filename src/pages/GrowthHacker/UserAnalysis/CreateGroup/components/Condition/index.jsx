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
	DatePicker,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	firstColumn,
	opMap,
} from './config';

export default function Condition({
	conditionChange,
}) {
	const [loading, setLoading] = useState(false);
	const [metricData, setMetricData] = useState([]);
	const [originData, setOriginData] = useState([]);
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

		return () => {
			api.cancelRequest();
		};
	}, []);

	useEffect(() => {
		if (originData.length === 0) {
			return;
		}
		setSteps([createStep()]);
	}, [metricData, originData]);

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
			})
		});
		const temp = onChangeCombination();
		setCombination(temp);
		refVariable.current.steps = steps;
		conditionChange(steps, temp);
	}, [steps]);

	function createData() {
		return {
			key: refVariable.current.id++,
			values: {
				flag: 'true,event',
				id: metricData[0] && metricData[0].value,
				op: '=',
				values: '1',
				value: '',
				date: [moment(), moment()],
			},
			curDate: [moment(), moment()],
			onVisibleChange: function(formCore, e) {
				if (!e) {
					formCore.setFieldValue('date', this.curDate);
				}
			},
			onOk: function(formCore, e) {
				formCore.setFieldValue('date', e);
				this.curDate = e;
			},
			onChange: function(e) {
				this.values = e;
				conditionChange(refVariable.current.steps);
			},
			onFocus: function(formCore) {
				if (!formCore.getFieldValue('id')) {
					return;
				}
				api.getOriginDataValues({
					id: this.values.id,
				}).then((res) => {
					formCore.setFieldProps('value', {
						dataSource: model.assembleOriginDataValues(res.data),
					});
				});
			},
			effects: [{
				field: 'flag',
				handler: function(formCore) {
					let visibleValues, visibleValue, idDataSource, opDataSource;
					const flag = formCore.getFieldValue('flag');
					if (flag=== 'true,event' || flag === 'false,event') {
						idDataSource = metricData;
						opDataSource = model.numOperators;
						visibleValues = true;
						visibleValue = false;
					} else {
						idDataSource = originData;
						opDataSource = model.strOperators;
						visibleValues = false;
						visibleValue = true;
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
				},
			}, {
				field: 'id',
				handler: function(formCore) {
					const flag = formCore.getFieldValue('flag');
					if (flag === 'true,event' || flag === 'false, event') {
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

	const onAddAndFilter = () => {
		if (steps.length > 3) {
			model.log('目前最多支持4条');
			return;
		}
		setSteps((pre) => {
			return [...pre, createStep(pre.length)];
		});
	}

	const notFoundContent = <span>加载中...</span>;

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

	const renderForm = (item, index, index_1, alias, length) => {
		const {
			onChange,
			effects,
			onVisibleChange,
			onOk,
			onFocus,
			key,
		} = item;
		item.alias = length === 1 ? alias : `${alias}${index_1+1}`;
		return (
			<Form
				key={key}
				ref={e=>{item.refForm = e}}
				onChange={onChange.bind(item)}
				effects={effects}
			>	
			{formCore=>(
				<div className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>{item.alias}</span>
						<Field name='flag'>
							<Select style={{minWidth:'120px'}} dataSource={firstColumn} />
						</Field>
						<Field name='id'>
							<Select style={{minWidth:'200px'}} dataSource={metricData} showSearch />
						</Field>
						<Field name='op'>
							<Select style={{minWidth:'120px'}} dataSource={model.numOperators} showSearch />
						</Field>
						<Field name='values'>
							<Input style={{width:'80px'}} htmlType="number" innerAfter={<span>次</span>} />
						</Field>
						<Field visible={false} name='value'>
							<Select style={{minWidth:'150px'}} dataSource={[]} notFoundContent={notFoundContent} onFocus={onFocus.bind(item,formCore)} />
						</Field>
						<Field name='date'>
							<DatePicker.RangePicker 
								style={{width:'120px'}} 
								hasClear={false}
								disabledDate={model.disabledDate} 
								onVisibleChange={onVisibleChange.bind(item,formCore)}
								onOk={onOk.bind(item,formCore)}
							/>
						</Field>
						<Button size='small' style={{marginLeft:'10px',borderRadius:'50%'}} onClick={onDelete.bind(this,index,index_1)}>x</Button>
					</div>
				</div>
			)}
			</Form>
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
			<div>
				<Components.Title title='新建分群' />
				<div className={styles.combination}>{combination}</div>
				{renderStep()}
				<Button className={styles.filter} onClick={onAddAndFilter}>
					<Icon type='add' size='small' className={styles.icon} />
					<span>AND</span>
				</Button>
			</div>
		</Loading>
	);
}