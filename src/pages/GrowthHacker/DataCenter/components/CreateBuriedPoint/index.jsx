import React, {
	Component,
	useEffect,
	useState,
	useRef
} from 'react';
import {
	Button,
	Input,
	Loading,
	Select
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

const {
	Option
} = Select;

export default function CreateBuriedPoint({
	onOk,
	entityType,
}) {
	const form = useRef(null);
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({});
	const [disabled, setDisabled] = useState(true);

	const onSubmit = () => {
		setShow(true);
		onOk(values, () => {
			setShow(false);
		});
	};

	const onReset = () => {
		setValues({});
		setDisabled(true);
	};

	const onChange = (e) => {
		form.current.validateAll((errors, values) => {
			setDisabled(errors ? true : false);
		});
	};

	return (
		<Loading visible={show} inline={false}>
      		<div className={styles.wrap}>
	        	<IceFormBinderWrapper value={values} ref={form} onChange={onChange}>
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
		           		<div className={styles.formLabel}>标识符：</div>
		           		<div className={styles.content}>
			            	<IceFormBinder name="key" required message="必填">
			              		<Input 
			              			className={styles.input} 
			              			placeholder='请输入标识符'
			              		/>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="key" />
			            	</div>
		            	</div>
		          	</div>
		
					{entityType=='event'?
		          	<div className={styles.formItem}>
		           		<div className={styles.formLabel}>类型：</div>
		           		<div className={styles.content}>
			            	<IceFormBinder name="value_type" required message="必填">
								<Select className={styles.input} >
								    <Option value="counter">计数器</Option>
								</Select>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="value_type" />
			            	</div>
		            	</div>
		          	</div>:null}
			
					{entityType=='variable'?
		         	<div className={styles.formItem}>
		           		<div className={styles.formLabel}>类型：</div>
		           		<div className={styles.content}>
			            	<IceFormBinder name="variable_type" required message="必填">
								<Select className={styles.input} >
								    <Option value="integer">整形</Option>
								    <Option value="float">浮点型</Option>
								    <Option value="string">字符串</Option>
								</Select>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="variable_type" />
			            	</div>
		            	</div>
		          	</div>:null}

		          	<div className={styles.formItem}>
		            	<div className={styles.formLabel}>描述：</div>
		            	<div className={styles.content}>
			            	<IceFormBinder name="desc">
			              		<Input 
			              			className={styles.input} 
			              		/>
			            	</IceFormBinder>
		            		<div className={styles.formError}>
		              			(选填)
		            		</div>
	            		</div>
		          	</div>
					
					<div className={styles.btnWrap}>
		          		<Button className={styles.btn} disabled={disabled} type="primary" onClick={onSubmit}>
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