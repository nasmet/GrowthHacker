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
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

export default function CreateBuriedPoint({
	onOk,
}) {
	const form = useRef(null);
	const [show, setShow] = useState(false);
	const [values, setValues] = useState(null);

	const validateAllFormField = () => {
		form.current.validateAll((errors, values) => {
			if (errors) {
				return;
			}
			setTimeout(() => {
				setShow(true);
				onOk(values);
			}, 500);
		});
	};

	const onReset = () => {
		setValues({});
	};

	return (
		<Loading visible={show} inline={false}>
      		<div className={styles.wrap}>
	        	<IceFormBinderWrapper value={values} ref={form}>
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
			            	<IceFormBinder name="event" required message="必填">
			              		<Input 
			              			className={styles.input} 
			              			placeholder='仅允许大小写英文字母、数字、下划线，并且不能以数字开头' 
			              		/>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="event" />
			            	</div>
		            	</div>
		          	</div>

		          	<div className={styles.formItem}>
		           		<div className={styles.formLabel}>类型：</div>
		           		<div className={styles.content}>
			            	<IceFormBinder name="type" required message="必填">
			              		<Input 
			              			className={styles.input} 
			              			placeholder='请输入类型'
			              		/>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="type" />
			            	</div>
		            	</div>
		          	</div>

		          	<div className={styles.formItem}>
		            	<div className={styles.formLabel}>描述：</div>
		            	<div className={styles.content}>
			            	<IceFormBinder name="description">
			              		<Input 
			              			className={styles.input} 
			              		/>
			            	</IceFormBinder>
		            		<div className={styles.formError}>
		              			(选填)
		            		</div>
	            		</div>
		          	</div>

		          	<div className={styles.formItem}>
		            	<div className={styles.formLabel}>关联事件级变量：</div>
		            	<div className={styles.content}>
			            	<IceFormBinder name="link">
			              		<Input className={styles.input} />
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