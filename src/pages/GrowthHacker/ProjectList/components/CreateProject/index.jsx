import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Input,
	Button,
	Select,
	Loading,
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

export default function CreateProject({
	onOk,
}) {
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({});
	const form = useRef(null);
	const [disabled, setDisabled] = useState(true);

	const validateAllFormField = () => {
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
		            	<div className={styles.formLabel}>应用类型：</div>
		            	<div className={styles.content}>
			            	<IceFormBinder name="type" required message="必填">
								<Select className={styles.input} >
								    <Select.Option value="miniapp">小程序</Select.Option>
								    <Select.Option value="minigame">小游戏</Select.Option>
								</Select>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="type" />
			            	</div>
		            	</div>
		          	</div>

		          	<div className={styles.formItem}>
		            	<div className={styles.formLabel}>appid：</div>
		            	<div className={styles.content}>
			            	<IceFormBinder name="appid" required message="必填">
								<Input 
		              				className={styles.input} 
		              				placeholder='请输入appid'
		              			/>
			            	</IceFormBinder>
			            	<div className={styles.formError}>
			              		<IceFormError name="appid" />
			            	</div>
		            	</div>
		          	</div>
					
	          		<div className={styles.formItem}>
	            		<div className={styles.formLabel}>域名：</div>
	            		<div className={styles.content}>
		            		<IceFormBinder name="domain_name" required message="必填">
		              			<Input 
		              				className={styles.input} 
		              				placeholder='请输入域名'
		              			/>
		            		</IceFormBinder>
		            		<div className={styles.formError}>
		              			<IceFormError name="domain_name" />
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
	          			<Button className={styles.btn} disabled={disabled} type="primary" onClick={validateAllFormField}>
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