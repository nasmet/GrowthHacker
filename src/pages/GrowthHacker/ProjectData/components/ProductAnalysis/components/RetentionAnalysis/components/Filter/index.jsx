import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Message,
	Loading,
	Icon,
	Select,
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	rules,
} from './filterConfig';

export default function Filter({
	filterChange,
}) {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});
	const [startCondition, setStartCondition] = useState([]);
	const [endCondition, setEndCondition] = useState([]);
	const [displayCondition, setDisplayCondition] = useState([]);
	const [userCondition, setUserCondition] = useState([]);
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);

	let cancelTask = false; // 防止内存泄漏
	useEffect(() => {
		setLoading(true);
		api.getDataCenter().then((res) => {
			if (cancelTask) {
				return;
			}
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
	}, []);

	function dividingData(data) {
		const dimensions = [];
		const metrics = [];
		data.forEach((item) => {
			const obj = {
				label: item.name,
				value: item.entity_key,
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

	const formChange = (e) => {
		filterChange(e);
	};

	const updateValues = (event, type, index) => {
		event((pre) => {
			pre.splice(index, 1);
			return [...pre];
		});

		setValues((pre) => {
			[1, 2, 3].forEach((item) => {
				if (pre[`${index}_${type}Filter_${item}`]) {
					delete pre[`${index}_${type}Filter_${item}`];
				}
			});
			return { ...pre
			};
		});
	};

	const onDeleteStart = (e) => {
		updateValues(setStartCondition, 'start', e);
	};

	const onDeleteEnd = (e) => {
		updateValues(setEndCondition, 'end', e);
	};

	const onDeleteDisplay = (e) => {
		updateValues(setDisplayCondition, 'display', e);
	};

	const onDeleteUser = (e) => {
		updateValues(setUserCondition, 'user', e);
	};

	const renderStartFilterCondition = () => {
		return startCondition.map((item, index) => {
			return filterCondition(item, index, 'start', onDeleteStart);
		});
	};

	const renderEndFilterCondition = () => {
		return endCondition.map((item, index) => {
			return filterCondition(item, index, 'end', onDeleteEnd);
		});
	};

	const renderDisplayFilterCondition = () => {
		return displayCondition.map((item, index) => {
			return displayFilterCondition(item, index);
		});
	};

	const renderUserFilterCondition = () => {
		return userCondition.map((item, index) => {
			return filterCondition(item, index, 'user', onDeleteUser);
		});
	};

	const displayFilterCondition = (item, index) => {
		return (
			<div key={item} className={styles.startCondition}>
				<IceFormBinder triggerType="onBlur" name={`${index}_displayFilter_1`}>
					<Select  
						className={styles.select}
						dataSource={[]}  
						showSearch
					/>
				</IceFormBinder>
				<span className={styles.name}>的</span>
				<IceFormBinder triggerType="onBlur" name={`${index}_displayFilter_2`}>
					<Select  
						className={styles.select}
						dataSource={[]}  
						showSearch
					/>
				</IceFormBinder>
				<Icon type="close" size='small' onClick={onDeleteDisplay.bind(this,index)} />
			</div>
		);
	};

	const getEvent = (index, type, value) => {
		let event = null;
		switch (type) {
			case 'start':
				event = setStartCondition;
				break;
			case 'end':
				event = setEndCondition;
				break;
			case 'user':
				event = setUserCondition;
				break;
			default:
				break;
		}
		return event;
	};

	const onLastSelectChange = (index, type, value) => {
		const event = getEvent(index, type, value);
		if (!event) {
			return;
		}
		event((pre) => {
			pre[index].showLast = rules[value - 1].showLast;
			return [...pre];
		});

	};

	const onfirstSelectChange = (index, type, value) => {
		const event = getEvent(index, type, value);
		if (!event) {
			return;
		}
		event((pre) => {
			pre[index].lastData = [{
				label: 'option',
				value: 'option',
			}]
			return [...pre];
		});
	};

	const filterCondition = (item, index, type, event) => {
		const {
			id,
			showLast,
			lastData,
		} = item;
		return (
			<div key={id} className={styles.startCondition}>
				<IceFormBinder triggerType="onBlur" name={`${index}_${type}Filter_1`}>
					<Select  
						className={styles.select}
						dataSource={[{
							label: 'option',
							value: 'option',
						}]} 
						showSearch
						onChange={onfirstSelectChange.bind(this,index,type)}
					/>
				</IceFormBinder>
				<IceFormBinder triggerType="onBlur" name={`${index}_${type}Filter_2`}>
					<Select  
						className={styles.select}
						dataSource={rules}
						showSearch
						onChange={onLastSelectChange.bind(this,index,type)}
					/>
				</IceFormBinder>
				{
					showLast?
						<IceFormBinder triggerType="onBlur" name={`${index}_${type}Filter_3`}>
							<Select  
								className={styles.select}
								dataSource={lastData}  
								showSearch
							/>
						</IceFormBinder>:null
				}
	
				<Icon type="close" size='small' onClick={event.bind(this,index)} />
			</div>
		);
	}

	const onAddStart = () => {
		setStartCondition((pre) => {
			return [...pre, {
				id: Date.now(),
				showLast: true,
				lastData: [],
			}];
		});
	};

	const onAddEnd = () => {
		setEndCondition((pre) => {
			return [...pre, {
				id: Date.now(),
				showLast: true,
			}];
		});
	};

	const onAddDisplay = () => {
		setDisplayCondition((pre) => {
			return [...pre, Date.now()];
		});
	};

	const onAddUser = () => {
		setUserCondition((pre) => {
			return [...pre, {
				id: Date.now(),
				showLast: true,
			}];
		});
	};

	const renderFilter = (event, name = '筛选条件') => {
		return (
			<div className={styles.filter} onClick={event}>
      			<Icon type='add' size='small' className={styles.icon} />
      			<span>{name}</span>
			</div>
		)
	};

	return (
		<Loading visible={loading} inline={false}>
			<IceFormBinderWrapper
	        	value={values}
	        	onChange={formChange}
	      	>	
				<IceContainer>
					<div className={styles.container}>
						显示满足如以下行为模式的用户留存情况
					</div>
					<div className={styles.container}>
						<div className={styles.item}>
							<span className={styles.name}>初始行为是</span>
							<IceFormBinder triggerType="onBlur" name="start">
								<Select  
									className={styles.select}
									dataSource={[]}  
									showSearch
								/>
			              	</IceFormBinder>
			       			{
			       				renderFilter(onAddStart)
			       			}
						</div>
						<div>
							{renderStartFilterCondition()}
						</div>
					</div>

					<div className={styles.container}>
						<div className={styles.item}>
							<span className={styles.name}>后续行为是</span>
							<IceFormBinder triggerType="onBlur" name="end">
								<Select  
									className={styles.select}
									dataSource={[]}  
									showSearch
								/>
			              	</IceFormBinder>
			              	{
			       				renderFilter(onAddEnd)
			       			}
						</div>
						<div>
							{renderEndFilterCondition()}
						</div>
					</div>

					<div className={styles.container}>
						<div className={styles.item}>
							<span className={styles.name}>同时显示</span>
							{
			       				renderFilter(onAddDisplay,'添加指标')
			       			}
						</div>
						<div>
							{renderDisplayFilterCondition()}
						</div>
					</div>

					<div className={styles.container}>
						<div className={styles.item}>
							<span className={styles.name}>且用户符合</span>
							{
			       				renderFilter(onAddUser)
			       			}
						</div>
						<div>
							{renderUserFilterCondition()}
						</div>
					</div>
				</IceContainer>
			</IceFormBinderWrapper>
		</Loading>
	);
}