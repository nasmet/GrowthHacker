import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
	Loading,
	Select,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';
import {
	originRules
} from './filterConfig';

export default function Filter({
	filterChange,
}) {
	const [originData, setOriginData] = useState([]);
	const [steps, setSteps] = useState([]);

	useEffect(() => {
		function getOriginData() {
			api.getOriginData().then((res) => {
				const originData = model.assembleOriginData(res.data);
				setOriginData(originData);
			}).catch(e => {
				console.error(e);
			});
		}

		getOriginData();

		return () => {
			api.cancelRequest();
		};
	}, []);

	useEffect(() => {
		if (steps.length === 0) {
			return;
		}
		steps.map(item => {
			item.refForm.store.setValues(item.values);
		});
		filterChange(steps);
	}, [steps]);

	function createStep() {
		return {
			key: Date.now(),
			values: {
				key: originData[0] && originData[0].value,
				op: '=',
				value: '',
			},
			effects: [{
				field: 'key',
				handler: function(formCore) {
					formCore.setFieldValue('value', '');
				},
			}],
			onChange: function(e) {
				this.values = e;
			},
			onFocus: function(formCore) {
				if (!this.values.key) {
					return;
				}
				api.getOriginDataValues({
					id: this.values.key,
				}).then((res) => {
					const data = model.assembleOriginDataValues(res.data);
					formCore.setFieldProps('value', {
						dataSource: data,
					});
				});
			},
			onDelete: function(e) {
				setSteps(pre => {
					pre.splice(e, 1);
					return [...pre];
				});
			},
		};
	}

	const onAddStep = () => {
		if (steps.length === 4) {
			model.log('最多支持4条过滤！');
			return;
		}
		setSteps((pre) => {
			return [...pre, createStep()];
		});
	};

	const notFoundContent = <span>加载中...</span>;

	const renderStep = () => {
		return steps.map((item, index) => {
			const {
				key,
				onChange,
				onFocus,
				values,
				effects,
				onDelete,
			} = item;

			return (
				<div key={key} style={{display:'flex',marginBottom:'10px', alignItems: 'center'}}>
					<div>
						<Form
							style={{display:'flex'}}
							onChange={onChange.bind(item)} 
							renderField={({label, component, error}) => (
					        	<span style={{marginRight:'20px'}}>{component}</span>
					        )}
					        effects={effects}
					        ref={e=>{item.refForm=e}}					   	
						>
						{formCore=>(
							<div>
							<Field name='key'>
								<Select
									style={{minWidth:'200px'}} 
									dataSource={originData}  
									showSearch
								/>
							</Field>
							<Field name='op'>
								<Select
									style={{minWidth:'100px'}} 
									dataSource={originRules}  
									showSearch
								/>
							</Field>
							<Field name='value'>
								<Select
									style={{minWidth:'200px'}} 
									dataSource={[]}  
									showSearch
									notFoundContent={notFoundContent}
									onFocus={onFocus.bind(item,formCore)}
								/>
							</Field>
							</div>
						)}
						</Form>
					</div>
					<Button size='small' style={{marginLeft:'4px',borderRadius:'50%'}} onClick={onDelete.bind(item,index)}>x</Button>
				</div>
			)
		});
	};

	return (
		<div>
			<div className={styles.wrap}>
				<span>全局过滤(AND)</span>
				<Button size='small' style={{marginLeft:'4px',borderRadius:'50%'}} onClick={onAddStep}>+</Button>
			</div>
			<div className={styles.stepContainer}>													
				{renderStep()}
			</div>
		</div>
	);
}