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

export default function CreateOriginDataValue({
	onOk,
	id,
	value_type,
}) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	const onSubmit = (e) => {
		setLoading(true);
		api.createOriginDataValues({
			id,
			trend: e,
		}).then((res) => {
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
      				onSubmit={onSubmit} 
  					rules={{
					    value:  [{
					      	required: true,
					     	message: '必填',
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
		      				<Field name='value'>
		  						<Input 
		              				className={styles.input} 
		              				placeholder='请输入元数据值'
		              				maxLength={50}
		              				htmlType={value_type==='string'?null:"number"}
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