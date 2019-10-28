import React, {
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Loading,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

export default function UserRegister() {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	function createAccount(username, password) {
		setLoading(true);
		api.createAccount({
			password,
			username,
		}).then(() => {
			model.log('创建成功');
			history.goBack();
		}).catch(e => {
			model.log(e);
			setLoading(false);
		});
	}

	const onRegister = (e) => {
		createAccount(e.username, e.password);
	};

	return (
		<div className={styles.wrap}>	
			<div>
				<Form 
					onSubmit={onRegister} 
					rules={{
						username: [{
							required: true,
							min: 5,
							message: '用户名至少5个字符',
						}],
							password:  [{
							required: true,
							min: 6,
							message: '密码必填,长度至少6位',
						}],
						confirm:  [{
							required: true,
							message: '必填',
						}],
					}}
					effects={[
						{
							field: 'confirm',
							handler: formCore => {
								if (formCore.getFieldValue('confirm') === formCore.getFieldValue('password')) {
									formCore.setFieldError('confirm', '');
								}else{
									formCore.setFieldError('confirm', '密码不一致');
								}
							},
						},
					]}
					renderField={({component, error}) => (
						<div className={styles.field}>
							<span>{component}</span>
							<span className={styles.error}>{error}</span>
						</div>
					)}
				>
						<Field name="username" >
							<Input style={{width: '200px'}} placeholder="请输入用户名" />
						</Field>
						<Field name="password" >
							<Input style={{width: '200px'}} htmlType="password" placeholder="请输入密码"  />
						</Field>
						<Field name="confirm" >
							<Input style={{width: '200px'}} htmlType="password" placeholder="请再次输入密码"  />
						</Field>
						<div className={styles.btnWrap}>
						<Button className={styles.btn} loading={loading} type='primary' htmlType="submit">注册</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
