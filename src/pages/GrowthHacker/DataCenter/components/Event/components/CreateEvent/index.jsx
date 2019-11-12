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

function CreateEvent({
	onOk,
}, ref) {
	const message = [{
		required: true,
		message: '必填',
	}];

	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [varibleData, setVaribleData] = useState([]);

	useImperativeHandle(ref, () => ({
		onShow: () => {
			setShow(true);
		},
		updateVaribleData: e => {
			setVaribleData(e);
		},
	}));

	const onSubmit = (e) => {
		setLoading(true);
		api.createEvent({ ...e,
			entity_type: 'event',
		}).then((res) => {
			model.log('创建成功');
			onOk(res.event_entity);
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
						key: message,
						value_type: message,
						bind_variables: message,
					}}
					renderField={({component, error}) => (
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
							<Field name='key'>
							<Input 
									className={styles.input} 
									placeholder='请输入标识符'
								/>
							</Field>							
							<Field name="value_type">
								<Select className={styles.input} placeholder='请选择类型' >
									<Select.Option value="counter">计数器</Select.Option>
								</Select>
							</Field>
							
							<Field name="bind_variables">
								<Select 
									className={styles.input} 
									mode='multiple' 
									dataSource={varibleData} 
									placeholder='请关联事件变量' 
									showSearch
							/>
							</Field>
							
							<Field name='desc'>
								<Input 
									className={styles.input} 
									placeholder='请输入描述'
									maxLength={50}
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

export default forwardRef(CreateEvent);