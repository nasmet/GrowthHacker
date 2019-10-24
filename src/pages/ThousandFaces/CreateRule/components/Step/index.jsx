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
	Button,
	Loading,
	Icon,
	Select,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';
import {
	originRules,
	firstColumn,
	opMap,
} from './stepConfig';

export default function Step({
	filterChange,
}) {
	const [loading, setLoading] = useState(false);
	const [groupData, setGroupData] = useState([]);
	const [tagData, setTagData] = useState([]);
	const [combination, setCombination] = useState('');
	const [steps, setSteps] = useState([]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getTags().then((res) => {
					setTagData(res.labels.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					}));
				});

				await api.getUserGroups().then((res) => {
					setGroupData(res.segmentations.map(item => {
						return {
							label: item.name,
							value: item.id,
						}
					}));
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

	useEffect(() => {
		if (groupData.length === 0) {
			return;
		}
		setSteps([createStep(0)]);
	}, [tagData, groupData]);

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
		})
		const temp = onChangeCombination();
		setCombination(temp);
		filterChange(steps, temp);
	}, [steps]);

	function createData(alias) {
		return {
			key: Date.now(),
			alias,
			values: {
				type: 'label',
				op: '=',
				id: tagData[0] && tagData[0].value,
			},
			onChange: function(e) {
				this.values = e;
			},
			effects: [{
				field: 'type',
				handler: function(formCore) {
					let dataSource;
					if (formCore.getFieldValue('type') === 'label') {
						dataSource = tagData;
					} else {
						dataSource = groupData;
					}
					formCore.setFieldProps('id', {
						dataSource,
					})
					formCore.setFieldValue('id', dataSource[0] && dataSource[0].value);
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
			key,
			alias,
			values,
			onChange,
			effects,
		} = item;
		return (
			<Form
				key={key}
	        	onChange={onChange.bind(item)}
	        	effects={effects}
	        	ref={e=>{item.refForm = e}}
			>	
			{formCore=>(
				<div className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>{alias}</span>
						<Field name='type' dataSource={firstColumn} component={Select} />
						<Field name='op' dataSource={originRules} component={Select} />
						<Field name='id'>
							<Select style={{width:'200px'}} dataSource={tagData} />
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
			<Components.Title title='新建规则' />
			<p className={styles.combination}>{combination}</p>
				{renderStep()}
			<Button className={styles.filter} onClick={onAddAndFilter}>
      			<Icon type='add' size='small' className={styles.icon} />
      			<span>AND</span>
			</Button>
		</Loading>
	);
}