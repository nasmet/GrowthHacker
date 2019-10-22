import React, {
	Component,
	useEffect,
	useState,
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

	useEffect(() => {

		return () => {
			api.cancelRequest();
		};
	}, []);

	const onSubmit = (e) => {
		setLoading(true);
		api.createEvent({ ...e,
			entity_type: entityType,
		}).then((res) => {
			model.log('创建成功');
			onOk(res.event_entity);
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
      				onSubmit={onSubmit} 
  					rules={{
					    condition_id: [{
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
		      				<Field name='condition_id'>
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