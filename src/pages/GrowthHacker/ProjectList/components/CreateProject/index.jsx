import React, {
	Component,
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Input,
	Button,
	Select,
	Loading,
	Dialog,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

function CreateProject({
	addProject,
}, ref) {
	const message = [{
		required: true,
		message: '必填',
	}];
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);

	useImperativeHandle(ref, () => ({
		onShow: () => {
			setShow(true);
		}
	}));

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	});

	const onSubmit = (e) => {
		setLoading(true);
		api.createProject(e).then((res) => {
			model.log('创建成功');
			addProject({
				id: res.id,
				...e,
			});
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
					    name: message,
					    type: message,
					    appid: message,
					    domain_name: message,
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
		              				maxLength={32}
		              			/>
		      				</Field>
		      				<Field name='type'>
								<Select className={styles.input} placeholder='请输入应用类型' >
								    <Select.Option value="miniapp">小程序</Select.Option>
								    <Select.Option value="minigame">小游戏</Select.Option>
								</Select>
		      				</Field>
		      				<Field name='appid'>
		  						<Input 
		              				className={styles.input} 
		              				placeholder='请输入appid'
		              				maxLength={32}
		              			/>
		      				</Field>
		      				<Field name='domain_name'>
		  						<Input 
		              				className={styles.input} 
		              				placeholder='请输入域名'
		              				maxLength={32}
		              			/>
		      				</Field>
		      				<Field name='desc'>
		  						<Input 
		              				className={styles.input} 
		              				placeholder='请输入描述'
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

export default forwardRef(CreateProject);