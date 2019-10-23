import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import {
	Form,
	Field,
} from '@ice/form';
import moment from 'moment';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	rules,
	originRules,
	firstColumn,
	opMap,
} from './stepConfig';
moment.locale('zh-cn');

export default function Filter({
	filterChange,
}) {
	const [loading, setLoading] = useState(false);
	const [metricData, setMetricData] = useState([]);
	const [originData, setOriginData] = useState([]);
	const [combination, setCombination] = useState('');
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
		if (originData.length === 0) {
			return;
		}
		setSteps([createStep(0)]);
	}, [metricData, originData]);

	useEffect(() => {
		if (steps.length === 0) {
			return;
		}

		const temp = onChangeCombination();
		setCombination(temp);
		filterChange(steps, temp);
	}, [steps]);

	function dividingData(data) {
		const metrics = [];
		data.forEach((item) => {
			const {
				id,
				entity_key,
				value_type,
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

	function createData(alias) {
		return {
			key: Date.now(),
			alias,
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
			},
			onFocus: function(formCore) {
				if (!formCore.getFieldValue('id')) {
					return;
				}
				api.getOriginDataValues({
					id: this.values.id,
				}).then((res) => {
					const data = res.data.map(item => item.value);
					formCore.setFieldProps('value', {
						dataSource: data,
					});
				});
			},
			effects: [{
				field: 'flag',
				handler: function(formCore) {
					let visibleValues, visibleValue, idDataSource, opDataSource;
					if (formCore.getFieldValue('flag') === 'true,event' || formCore.getFieldValue('flag') === 'false, event') {
						idDataSource = metricData;
						opDataSource = rules;
						visibleValues = true;
						visibleValue = false;
					} else {
						idDataSource = originData;
						opDataSource = originRules;
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
				}
			}]
		}
	}

	function createStep(index) {
		const alias = opMap[index];
		return {
			key: Date.now(),
			op: 'AND',
			alias,
			step: [createData(alias)],
			onChangeOp: function() {
				this.op = this.op === 'AND' ? 'OR' : 'AND';
				setSteps(pre => [...pre]);
			},
			onAddOrFilter: function() {
				if (this.step.length > 3) {
					Message.success('目前最多支持4条');
					return;
				}
				if (this.step.length === 1) {
					this.step[0].alias = `${alias}1`;
				}
				this.step.push(createData(`${alias}${this.step.length+1}`));
				setSteps(pre => [...pre]);
			},
		}
	}

	const onAddAndFilter = () => {
		if (steps.length > 3) {
			Message.success('目前最多支持4条');
			return;
		}
		setSteps((pre) => {
			const temp = createStep(pre.length);
			return [...pre, temp];
		});
	}

	const notFoundContent = <span>加载中...</span>;

	const renderForm = (item) => {
		const {
			alias,
			values,
			onChange,
			effects,
			onVisibleChange,
			onOk,
			curDate,
			onFocus,
			key,
		} = item;
		return (
			<Form
				key={key}
	        	initialValues={values}
	        	onChange={onChange.bind(item)}
	        	effects={effects}
			>	
			{formCore=>(
				<div className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>{alias}</span>
						<Field name='flag'>
							<Select style={{width:'120px'}} dataSource={firstColumn} />
						</Field>
						<Field name='id'>
							<Select style={{width:'200px'}} dataSource={metricData} showSearch />
						</Field>
						<Field name='op' dataSource={rules} component={Select} />
						<Field name='values'>
							<Input style={{width:'80px'}} htmlType="number" innerAfter={<span>次</span>} />
						</Field>
						<Field visible={false} name='value'>
							<Select style={{width:'150px'}} dataSource={[]} notFoundContent={notFoundContent} onFocus={onFocus.bind(item,formCore)} />
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
					</div>
				</div>
			)}
			</Form>
		);
	}

	const renderChild = (item) => {
		return item.map((v) => {
			return renderForm(v);
		});
	}

	const renderStep = () => {
		return steps.map((item, index) => {
			return (
				<div key={item.key}>
					<div className={styles.step}>
						{
							renderChild(item.step)
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
			<p className={styles.title}>新建分群</p>
			<div className={styles.combination}>{combination}</div>
				{renderStep()}
			<Button className={styles.filter} onClick={onAddAndFilter}>
      			<Icon type='add' size='small' className={styles.icon} />
      			<span>AND</span>
			</Button>
		</Loading>
	);
}