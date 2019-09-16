import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	Option,
} = Select;

export default function CreateBoard({
	onOk,
}) {
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({});
	const form = useRef(null);

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