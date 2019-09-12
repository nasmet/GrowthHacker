import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	Dialog,
	Button,
	Input,
	Loading,
	Message,
	Select,
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

const {
	Option,
} = Select;

export default function CreateBuriedPoint({
	onOk,
}) {
	const form = useRef(null);
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({});
	const [entityType, setEntityType] = useState('');

	const validateAllFormField = () => {
		form.current.validateAll((errors, values) => {
			if (errors) {
				return;
			}
			setShow(true);
			onOk(values, () => {
				setShow(false);
			});
		});
	};

	const onReset = () => {
		setValues({});
	};

	const onChange = (e) => {
		setEntityType(e.entity_type);
	};

	return (
		<Loading visible={show} inline={false}>
      		<div className={styles.wrap}>
	        	<IceFormBinderWrapper onChange={onChange} value={values} ref={form}>
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
		
		          	<div className={styles.formItem}>
		            	<div className={styles.formLabel}>类别：</div>
		            	<div className={styles.content}>
			            	<IceFormBinder name="entity_type" required message="必填">
								<Select className={styles.input} >
								    <Option value="event">事件</Option>
								    <Option value="variable">变量</Option>
								</Select>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="entity_type" />
			            	</div>
		            	</div>
		          	</div>

					{entityType=='event'?
		          	<div className={styles.formItem}>
		           		<div className={styles.formLabel}>事件类型：</div>
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
		           		<div className={styles.formLabel}>事件变量类型：</div>
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