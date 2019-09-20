import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Input,
	Button,
	Message,
	Loading,
	Select,
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import {
	typeData,
} from './createBoardConfig';

export default function CreateBoard({
	onOk,
}) {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});
	const [dimensionData, setDimensionData] = useState([]);
	const [metricData, setMetricData] = useState([]);
	const form = useRef(null);
	const [type, setType] = useState('');

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

	const validateAllFormField = () => {
		form.current.validateAll((errors, values) => {
			if (errors) {
				return;
			}
			setLoading(true);
			onOk(values, () => {
				setLoading(false);
			});
		});
	};

	const onChange = (e) => {
		console.log(e);
		setType(e.type);
	};

	const onReset = () => {
		setValues({});
	};

	return (
		<Loading visible={loading} inline={false}>
      		<div className={styles.wrap}>
	        	<IceFormBinderWrapper value={values} onChange={onChange} ref={form}>
	          		<div className={styles.formItem}>
	            		<div className={styles.formLabel}>名称：</div>
	            		<div className={styles.content}>
		            		<IceFormBinder name="name" required message="必填">
		              			<Input 
		              				className={styles.input} 
		              				placeholder='请输入名称'
		              			/>
		            		</IceFormBinder>
		            		<div className={styles.formError}>
		              			<IceFormError name="name" />
		            		</div>
	            		</div>
	          		</div>
						
					<div className={styles.formItem}>
		            	<div className={styles.formLabel}>类型：</div>
		            	<div className={styles.content}>
			            	<IceFormBinder name="type" required message="必填">
								<Select 
									className={styles.input} 
									dataSource={typeData}
								/>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="dimensions" />
			            	</div>
		            	</div>
		          	</div>
					
					{
						type==='dashboard'?
						<div>
				          	<div className={styles.formItem}>
				            	<div className={styles.formLabel}>维度：</div>
				            	<div className={styles.content}>
					            	<IceFormBinder name="dimensions" required message="必填">
										<Select 
											className={styles.input} 
											dataSource={dimensionData} 
											mode='multiple'
											showSearch
										/>
					            	</IceFormBinder>
					            	<div className={styles.formError}>
					              		<IceFormError name="dimensions" />
					            	</div>
				            	</div>
				          	</div>
							
				          	<div className={styles.formItem}>
				            	<div className={styles.formLabel}>事件：</div>
				            	<div className={styles.content}>
					            	<IceFormBinder name="metrics" required message="必填">
										<Select 
											className={styles.input} 
											dataSource={metricData} 
											mode='multiple'
											showSearch
										/>
					            	</IceFormBinder>
					            	<div className={styles.formError}>
					              		<IceFormError name="metrics" />
					            	</div>
				            	</div>
				          	</div>
						</div>: null
					}
					
					{
						type==='retention'?
						<div>
				          	<div className={styles.formItem}>
				            	<div className={styles.formLabel}>初始行为：</div>
				            	<div className={styles.content}>
					            	<IceFormBinder name="init_event" required message="必填">
										<Select 
											className={styles.input} 
											dataSource={metricData} 
										/>
					            	</IceFormBinder>
					            	<div className={styles.formError}>
					              		<IceFormError name="init_event" />
					            	</div>
				            	</div>
				          	</div>
							
				          	<div className={styles.formItem}>
				            	<div className={styles.formLabel}>后续行为：</div>
				            	<div className={styles.content}>
					            	<IceFormBinder name="retention_event" required message="必填">
										<Select 
											className={styles.input} 
											dataSource={metricData} 
										/>
					            	</IceFormBinder>
					            	<div className={styles.formError}>
					              		<IceFormError name="retention_event" />
					            	</div>
				            	</div>
				          	</div>
						</div>: null
					}

	          		<div className={styles.formItem}>
	            		<div className={styles.formLabel}>描述：</div>
	            		<div className={styles.content}>
		            		<IceFormBinder name="desc" required message="必填"> 
		              			<Input 
		              				className={styles.input} 
		              			/>
		            		</IceFormBinder>
		            		<div className={styles.formError}>
		              			<IceFormError name="desc" />
		            		</div>
	            		</div>
	          		</div>

					<div className={styles.btnWrap}>
	          			<Button className={styles.btn} type="primary" onClick={validateAllFormField}>
		            		确定
		          		</Button>
		          		<Button className={styles.btn} type="primary" onClick={onReset}>
		            		重置
		          		</Button>
	          		</div>
	        	</IceFormBinderWrapper>
      		</div>
   		</Loading>
	);
}