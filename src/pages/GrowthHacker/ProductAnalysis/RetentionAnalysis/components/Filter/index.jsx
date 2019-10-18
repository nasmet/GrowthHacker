import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Loading,
	Select,
	Button,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

export default function Filter({
	filterChange,
}) {
	const [steps,setSteps] = useState([createBehavior('init_event','初始行为是'),createBehavior('retention_event','后续行为是'),createUserBehavior()]);

	useEffect(() => {
		filterChange(steps);

		return () => {
			api.cancelRequest();
		};
	}, []);

	const notFoundContent = <span>加载中...</span>;

	function createBehavior(name,label) {
		return {
			name,
			label,
			values: {},
			onChange: function(e) {
				this.values = e;
			},
			onFocus: function(){
				const dataSource = this.ref.store.getFieldProps(name).dataSource;
				if (!dataSource) {
					const self = this;
					api.getDataCenter().then((res) => {
						const metrics = [];
						res.event_entities.forEach((item) => {
							if (item.type === 'event') {
								metrics.push({
									label: item.name,
									value: item.entity_key,
								});
							}
						});
						self.ref.store.setFieldProps(name, {
							dataSource: metrics,
						});
					});
				}
			},
			filter:[],
			onAddFilter:function(){
				this.filter.push(createFilter());
				setSteps(pre=>[...pre]);
			}
		}
	}


	function createUserBehavior() {
		return {
			values: {},
			onChange: function(e) {
				this.values = e;
			},
			onFocus: function(){
				const dataSource = this.ref.store.getFieldProps('segmentation_id').dataSource;
				if (!dataSource) {
					const self = this;
					api.getUserGroups().then((res) => {
						const targets = res.segmentations.map((item) => {
							return {
								label: item.name,
								value: item.id,
							};
						});
						targets.splice(0, 0, {
							label: '全部用户',
							value: 0,
						});
						self.ref.store.setFieldProps('segmentation_id', {
							dataSource: targets,
						});
					});
				}
			},
		}
	}

	function createFilter(){
		return {
			key: Date.now(),
			values: {},
			onChange: function(e) {
				this.values = e;
			},
			onFocus: function(){
				const dataSource = this.ref.store.getFieldProps('key').dataSource;
				if (!dataSource) {
					const self = this;
					api.getDataCenter().then((res) => {
						const metrics = [];
						res.event_entities.forEach((item) => {
							if (item.type === 'event') {
								metrics.push({
									label: item.name,
									value: item.entity_key,
								});
							}
						});
						self.ref.store.setFieldProps('key', {
							dataSource: metrics,
						});
					});
				}
			},
		};
	}
	
	const renderSteps=()=>{
		return steps.map((item,index)=>{
			const {
				name,
				label,
				onChange,
				onFocus,
				filter,
				onAddFilter,
			}= item;
			if(index===2){
				return( 
					<Form 
						key='segmentation_id'
						ref={e=>{item.ref = e}}
						onChange={onChange.bind(item)} 
				        renderField={({label, component, error}) => (
				            <div className={styles.field}>
				              	<div style={{width:'100px'}}>{label}</div>
				              	<span>{component}</span>
				            </div>
				        )}
					>
						<Field label='目标用户' name='segmentation_id'>
							<Select  
								style={{width:'200px'}} 
								dataSource={[]}  
								showSearch
								onFocus={onFocus.bind(item)}
								notFoundContent={notFoundContent}
							/>
						</Field>
					</Form>
				);
			}
			return (
				<div key={name} style={{marginBottom:'20px',borderBottom:'1px solid #e6e6e6'}}>
					<Form 
						ref={e=>{item.ref = e}}
						onChange={onChange.bind(item)} 
						renderField={({label, component, error}) => (
				            <div className={styles.field}>
				              	<div style={{width:'100px'}}>{label}</div>
				              	<span style={{marginRight:'20px'}}>{component}</span>
				              	<Button size='small' style={{marginRight:'4px',borderRadius:'50%'}} onClick={onAddFilter.bind(item)}>+</Button>
				              	<span>筛选条件</span>
				            </div>
				        )}

					>
						<Field label={label} name={name}>
							<Select
								style={{width:'200px'}} 
								dataSource={[]}  
								showSearch
								onFocus={onFocus.bind(item)}
								notFoundContent={notFoundContent}
							/>
						</Field>
					</Form>
					<div style={{marginLeft:'20px',marginBottom:'10px'}}>
						{filter.map(item=>{
							const {
								key,
								onChange,
								onFocus,
							} = item;
							
							return ( 
								<Form 
									style={{display:'flex'}}
									key={key}
									ref={(e)=>{item.ref = e}}
									onChange={onChange.bind(item)} 
									renderField={({label, component, error}) => (
							        	<span style={{marginRight:'20px'}}>{component}</span>
							        )}

								>
									<Field name='key'>
										<Select
											style={{width:'200px'}} 
											dataSource={[]}  
											showSearch
											notFoundContent={notFoundContent}
											onFocus={onFocus.bind(item)}
										/>
									</Field>
									<Field name='op'>
										<Select
											style={{width:'100px'}} 
											dataSource={[]}  
											showSearch
											notFoundContent={notFoundContent}
										/>
									</Field>
									<Field name='value'>
										<Select
											style={{width:'200px'}} 
											dataSource={[]}  
											showSearch
											notFoundContent={notFoundContent}
										/>
									</Field>
								</Form>
							)
						})}
					</div>
				</div>
			)
		});
	};


	return (
		<div>
			<div className={styles.title}>
				显示满足如以下行为模式的用户留存情况
			</div>
			{renderSteps()}
		</div>
	);
}