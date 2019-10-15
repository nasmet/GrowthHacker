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
	firstColumn,
} from './stepConfig';
moment.locale('zh-cn');

export default function Filter({
	filterChange,
}) {
	const [loading, setLoading] = useState(false);
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);
	const [combination, setCombination] = useState('');
	const [steps, setSteps] = useState([]);

	function getDataCenter() {
		setLoading(true);
		api.getDataCenter().then((res) => {
			dividingData(res.event_entities);
			setLoading(false);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	function dividingData(data) {
		const dimensions = [];
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
				value: `${id},${value_type}`,
			};
			if (item.type === 'event') {
				metrics.push(obj);
			} else {
				dimensions.push(obj);
			}
		});
		setMetricData(metrics);
		setDimensionData(dimensions);
	}

	useEffect(() => {
		getDataCenter();

		return () => {
			api.cancelRequest();
		};
	}, []);

	useEffect(() => {
		let temp = '';
		steps.forEach((item) => {
			if (temp) {
				temp += ' and '
			}
			if (utils.isArray(item)) {
				temp += `(${item[0].alias} or ${item[1].alias})`;
			} else {
				temp += item.alias;
			}
		});
		if (metricData.length > 0) {

		}
		setCombination(temp);
		filterChange(steps, temp);
	}, [steps]);

	function createStep(alias) {
		return {
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
			effects: [{
				field: 'flag',
				handler: function(formCore) {
					let visibleValues, visibleValue, dataSource;
					if (formCore.getFieldValue('flag') === 'true,event' || formCore.getFieldValue('flag') === 'false, event') {
						dataSource = metricData;
						visibleValues = true;
						visibleValue = false;
					} else {
						dataSource = dimensionData;
						visibleValues = false;
						visibleValue = true;
					}
					formCore.setFieldProps('id', {
						dataSource,
					})
					formCore.setFieldValue('id', dataSource[0].value);
					formCore.setFieldProps('values', {
						visible: visibleValues,
					})
					formCore.setFieldProps('value', {
						visible: visibleValue,
						dataSource,
					})
					formCore.setFieldValue('value', '');
				}
			}]
		}
	};

	const onAddOrFilter = (stepIndex) => {
		if (utils.isArray(steps[stepIndex])) {
			Message.success('目前只支持一条OR');
			return;
		}
		setSteps((pre) => {
			const cur = pre[stepIndex];
			const alias = cur.alias;
			cur.alias = `${alias}1`;

			const temp = createStep(`${alias}2`);
			pre[stepIndex] = [cur, temp];
			return [...pre];
		});
	};

	const onAddAndFilter = () => {
		if (steps.length > 1) {
			Message.success('目前最多支持两条AND');
			return;
		}
		setSteps((pre) => {
			const temp = createStep(steps.length === 0 ? 'A' : 'B');
			return [...pre, temp];
		});
	}

	const renderForm = (item) => {
		const {
			alias,
			values,
			onChange,
			effects,
			onVisibleChange,
			onOk,
			curDate,
		} = item;
		return (
			<Form
				key={alias}
	        	initialValues={values}
	        	onChange={onChange.bind(item)}
	        	effects={effects}
	        	layout={{}}
			>	
			{formCore=>(
				<div className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>{alias}</span>
						<Field name='flag'>
							<Select style={{width:'120px'}} dataSource={firstColumn} />
						</Field>
						<Field name='id'>
							<Select style={{width:'150px'}} dataSource={metricData} showSearch />
						</Field>
						<Field name='op' dataSource={rules} component={Select} />
						<Field name='values'>
							<Input style={{width:'80px'}} htmlType="number" innerAfter={<span>次</span>} />
						</Field>
						<Field visible={false} name='value'>
							<Select style={{width:'150px'}} dataSource={[]} />
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
		if (utils.isArray(item)) {
			return item.map((v) => {
				return renderForm(v);
			});
		}
		return renderForm(item);
	}

	const renderStep = () => {
		return steps.map((item, index) => {
			return (
				<div className={styles.step} key={index}>
					{
						renderChild(item)
					}
					<Button className={styles.filter} onClick={onAddOrFilter.bind(this, index)} >
						<Icon type='add' size='small' className={styles.icon} /> 
						<span>OR</span> 
					</Button>
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