import React, {
	useEffect,
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Button,
	Input,
	Loading,
	Select,
	Dialog,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

function CreateEventVaribleValue({
	onOk,
	id,
}, ref) {
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);

	useImperativeHandle(ref, () => ({
		onShow: () => {
			setShow(true);
		},
	}));

	const onSubmit = (e) => {
		setLoading(true);
		api.createEventVariableValue({
			id,
			trend: e,
		}).then((res) => {
			model.log('创建成功');
			onOk(res);
			setLoading(false);
			setShow(false);
		}).catch((e) => {
			model.log(e);
			setLoading(false);
		});
	};

	const onReset = (formCore) => {
		formCore.reset();
	};

	const onClose = () => {
		setShow(false);
	};

	return (
		<Dialog		   	 
			autoFocus		   		
			visible={show}		      	 
			onClose={onClose}		      	
			footer={false}		      	
		>	
			<div className={styles.wrap}>
      			<Form
      				onSubmit={onSubmit} 
  					rules={{
					    value:  model.rule,
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
		              				placeholder='请输入事件变量值'
		              				maxLength={32}
		              			/>
		      				</Field>
		      				<div className={styles.btnWrap}>
			          			<Button className={styles.btn} loading={loading} type="primary" htmlType="submit">
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
		</Dialog>
	);
}

export default forwardRef(CreateEventVaribleValue);