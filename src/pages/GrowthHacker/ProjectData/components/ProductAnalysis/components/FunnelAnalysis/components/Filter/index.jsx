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
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
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
	const [steps, setSteps] = useState([]);

	let cancelTask = false; // 防止内存泄漏
	useEffect(() => {
		return () => {
			cancelTask = true;
		};
	}, []);

	const formChange = (e) => {
		filterChange(e);
	};

	const onAddStep = () => {
		setSteps((pre) => {
			return [...pre, {
				filters: [],
			}];
		});
	};

	const onAddFilter = (stepIndex) => {
		setSteps((pre) => {
			const filters = pre[stepIndex].filters;
			filters.push({
				id: Date.now(),
				showLast: true,
				lastData: [],
			});
			return [...pre];
		});
	};

	const deleteFilter = (stepIndex, filterIndex) => {
		setSteps((pre) => {
			const filters = pre[stepIndex].filters;
			filters.splice(filterIndex, 1);
			return [...pre];
		});

		console.log(stepIndex, filterIndex);
		setValues((pre) => {
			[1, 2, 3].forEach((item) => {
				if (pre[`step_${stepIndex}_filter_${filterIndex}_${item}`]) {
					delete pre[`step_${stepIndex}_filter_${filterIndex}_${item}`];
				}
			});
			return { ...pre
			};
		});
	};

	const onfirstSelectChange = (stepIndex, filterIndex, value) => {
		setSteps((pre) => {
			pre[stepIndex].filters[filterIndex].lastData = [{
				label: 'option',
				value: 'option',
			}];
			return [...pre];
		});
	};

	const onLastSelectChange = (stepIndex, filterIndex, value) => {
		setSteps((pre) => {
			pre[stepIndex].filters[filterIndex].showLast = rules[value - 1].showLast;
			return [...pre];
		});
	};

	const renderFilterCondition = (filters, stepIndex) => {
		return filters.map((item, index) => {
			const {
				id,
				showLast,
				lastData,
			} = item;
			return (
				<div key={id} className={styles.filterCondition}>
				<IceFormBinder triggerType="onBlur" name={`step_${stepIndex}_filter_${id}_1`}>
					<Select  
						className={styles.select}
						dataSource={[{
							label: 'option',
							value: 'option',
						}]} 
						showSearch
						onChange={onfirstSelectChange.bind(this,stepIndex,index)}
					/>
				</IceFormBinder>
				<IceFormBinder triggerType="onBlur" name={`step_${stepIndex}_filter_${id}_2`}>
					<Select  
						className={styles.select}
						dataSource={rules}
						showSearch
						onChange={onLastSelectChange.bind(this,stepIndex,index)}
					/>
				</IceFormBinder>
				{
					showLast?
						<IceFormBinder triggerType="onBlur"name={`step_${stepIndex}_filter_${id}_3`}>
							<Select  
								className={styles.select}
								dataSource={lastData}  
								showSearch
							/>
						</IceFormBinder>:null
				}
	
				<Icon type="close" size='small' onClick={deleteFilter.bind(this,stepIndex,index)} />
			</div>
			);
		});
	}

	const renderStep = () => {
		return steps.map((item, index) => {
			return (
				<div key={index} className={styles.container}>
					<div className={styles.item}>
						<span className={styles.name}>Step{`${index+1}`}</span>
						<IceFormBinder triggerType="onBlur" name={`step_${index}`}>
							<Select  
								className={styles.select}
								dataSource={[{
									label: 'option',
									value: 'option',
								}]}  
								showSearch
							/>
		              	</IceFormBinder>
		       			<div className={styles.filter} onClick={onAddFilter.bind(this, index)}>
			      			<Icon type='add' size='small' className={styles.icon} />
			      			<span>触发限制条件</span>
						</div>
					</div>
					<div>
						{renderFilterCondition(item.filters,index)}
					</div>
				</div>
			);
		});
	};

	return (
		<Loading visible={loading} inline={false}>
			<IceFormBinderWrapper
	        	value={values}
	        	onChange={formChange}
	      	>	
				<IceContainer>
					<div className={`${styles.container} ${styles.title}`}>
						漏斗步骤
					</div>
					{renderStep()}
					<div>
						<Button type='primary' onClick={onAddStep}>增加步骤</Button>
					</div>
				</IceContainer>
			</IceFormBinderWrapper>
		</Loading>
	);
}