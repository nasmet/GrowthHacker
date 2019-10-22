import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	Button,
	Input,
	Loading,
	Select
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

export default function CreatePlan({
	onOk,
}) {
	const [loading, setLoading] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				await api.getRules().then((res) => {
					formRef.current.state.store.setFieldProps('rule_id', {
						dataSource: res.labels.map(item => {
							return {
								value: item.id,
								label: item.name,
							}
						}),
					});
				});

				await api.getStrategies().then((res) => {
					formRef.current.state.store.setFieldProps('strategy_id', {
						dataSource: res.strategies.map(item => {
							return {
								value: item.id,
								label: item.name,
							}
						}),
					});
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

	const onSubmit = (e) => {
		setLoading(true);
		api.createSchemes(e).then((res) => {
			model.log('创建成功');
			onOk(res);
		}).catch((e) => {
			model.log(e);
			setLoading(false);
		});
	};

	const onReset = (formCore) => {
		formCore.reset();
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
      			<Form
      				ref={formRef}
      				onSubmit={onSubmit} 
  					rules={{
  						name:[{
					      required: true,
					      message: '必填'
					    }],
					    rule_id: [{
					      required: true,
					      message: '必填'
					    }],
					    strategy_id:  [{
					      	required: true,
					     	message: '必填'
					    }],
					}}
					renderField={({label, component, error}) => (
		            	<div className={styles.field}>
		              		<span className={styles.input}>{component}</span>
		              		<span className={styles.error}>{error}</span>
		           		</div>
		          	)}
      			>
	      			{formCore => (
	      				<div>
							<Field name='name'>
		  						<Input 
		              				className={styles.input} 
		              				placeholder='请输入名称'
		              				maxLength={50}
		              			/>
		      				</Field>

		      				<Field name='rule_id'>
								<Select className={styles.input} dataSource={[]} placeholder='请选择策略' >
								</Select>
		      				</Field>

		      				<Field name='strategy_id'>
								<Select className={styles.input} dataSource={[]} placeholder='请选择规则' >
								</Select>
		      				</Field>

		      				<Field name='desc'>
		  						<Input 
		              				className={styles.input} 
		              				placeholder='请输入描述'
		              				maxLength={50}
		              			/>
		      				</Field>
		      				<div className={styles.btnWrap}>
			          			<Button className={styles.btn} type="primary" htmlType="submit">
				            		确定
				          		</Button>
				          		<Button className={styles.btn} type="primary" onClick={onReset.bind(this,formCore)}>
				            		重置
				          		</Button>
			          		</div>
		          		</div>
		          	)}
      			</Form>
      		</div>
   		</Loading>
	);
}