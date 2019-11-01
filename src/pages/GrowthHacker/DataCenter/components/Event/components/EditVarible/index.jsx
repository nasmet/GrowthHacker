import React, {
	useEffect,
	useState,
	useRef,
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

function EditVarible({
	onOk,
}, ref) {
	const message = [{
		required: true,
		message: '必填',
	}];

	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [data, setData] = useState([]);
	const refForm = useRef(null);
	const refVarible = useRef({
		varibleData: [],
		id: 0,
	});

	useImperativeHandle(ref, () => ({
		onShow: (id, selected) => {
			refVarible.current.id = id;
			const temp = utils.deepArray(refVarible.current.varibleData);
			selected.forEach(v => {
				temp.forEach(item => {
					if (v.id === item.value) {
						item.disabled= true;
					}
				})
			})
			setData(temp);
			setShow(true);
		},
		setVaribleData: e => {
			refVarible.current.varibleData = e;
		},
	}));

	useEffect(() => {
		if (show) {
			refForm.current.store.setFieldValue('bind_variables', refVarible.current.select);
		}
	}, [show]);

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	const onSubmit = async (e) => {
		setLoading(true);
		api.addBindVariables({
			id: refVarible.current.id,
			trend: {
				variables: e.bind_variables,
			}
		}).then(() => {
			model.log('编辑成功');
			onOk();
			setLoading(false);
			setShow(false);
		}).catch(e => {
			model.log(e);
			setLoading(false);
		});
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
					ref={refForm}
					onSubmit={onSubmit}      				 
					renderField={({component, error}) => (
						<div className={styles.field}>
							<span className={styles.input}>{component}</span>
							<span className={styles.error}>{error}</span>
						</div>
					)}
					rules={{  					
						bind_variables: message,
					}}
				>      			
					<div>
						<Field name="bind_variables">
							<Select 
								className={styles.input} 
								mode='multiple' 
								dataSource={data} 
								placeholder='关联事件变量' 
								showSearch
						/>
						</Field>

						<div className={styles.btnWrap}>
							<Button className={styles.btn} loading={loading} type="primary" htmlType="submit">
								确定
							</Button>
							<Button className={styles.btn} type="primary" onClick={onClose}>
								取消
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</Dialog>
	);
}

export default forwardRef(EditVarible);