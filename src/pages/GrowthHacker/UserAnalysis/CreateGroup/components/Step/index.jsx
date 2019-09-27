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
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
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
const {
	RangePicker,
} = DatePicker;

function createStep() {

}

export default function Filter({
	filterChange,
}) {
	const [loading, setLoading] = useState(false);
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);
	const [combination, setCombination] = useState('');
	const [steps, setSteps] = useState([]);
	let cancelTask = false; // 防止内存泄漏

	function getDataCenter() {
		setLoading(true);
		api.getDataCenter().then((res) => {
			if (cancelTask) {
				return;
			}
			console.log(res);
			dividingData(res.event_entities);
			setLoading(false);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
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
			cancelTask = true;
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
		setCombination(temp);
		filterChange(steps, temp);
	}, [steps]);

	const onAddStep = () => {
		setSteps((pre) => {
			return [...pre, {
				filters: [],
			}];
		});
	};

	function createStep(alias) {
		return {
			alias,
			values: {
				flag: 'true,event',
				id: metricData[0].value,
				op: '=',
				values: '1',
				value: '',
			},
			onChange: function(e) {
				console.log(e);
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
		} = item;
		return (
			<Form
				key={alias}
	        	initialValues={values}
	        	onChange={onChange.bind(item)}
	        	effects={effects}
			>	
				<div className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>{alias}</span>
						<Field name='flag' dataSource={firstColumn} component={Select} />
						<Field name='id' dataSource={metricData} component={Select} />
						<Field name='op' dataSource={rules} component={Select} />
						<Field  name='values' htmlType="number" placeholder="请输入次数" component={Input} />
						<Field visible={false} name='value' dataSource={[]} component={Select} />
						<Field name='range' component={RangePicker} />
					</div>
				</div>
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
					<div className={styles.filter} onClick={onAddOrFilter.bind(this, index)} >
						<Icon type='add' size='small' className={styles.icon} /> 
						<span>OR</span> 
					</div>
				</div>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.title}>新建分群</div>
			<div className={styles.combination}>{combination}</div>
				{renderStep()}
			<div className={styles.filter} onClick={onAddAndFilter}>
      			<Icon type='add' size='small' className={styles.icon} />
      			<span>AND</span>
			</div>
		</Loading>
	);
}