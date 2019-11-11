import React, {
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Loading,
	Checkbox,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function UserLogin({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});

	useEffect(() => {
		sessionStorage.removeItem(config.PROJECTID);
		sessionStorage.removeItem(config.TOKENKEY);

		const username = localStorage.getItem(config.ACCOUNT);
		if (username) {
			const password = localStorage.getItem(config.PASSWORD);
			setValues({
				flag: true,
				username,
				password,
			});
		}
	}, []);

	const onLogin = (e) => {
		const {
			username,
			password,
			flag,
		} = e;
		setLoading(true);
		api.login({
			username,
			password,
		}).then((res) => {
			if (flag) {
				localStorage.setItem(config.ACCOUNT, username);
				localStorage.setItem(config.PASSWORD, password);
			} else {
				localStorage.removeItem(config.ACCOUNT);
				localStorage.removeItem(config.PASSWORD);
			}
			sessionStorage.setItem(config.TOKENKEY, res.token);
			sessionStorage.setItem(config.USERNAME, username);
			history.push('/');
		}).catch(e => {
			model.log(e);
			setLoading(false);
		});
	};

	return (
		<div className={styles.wrap}>	
			<div>
				<Form 
					onSubmit={onLogin} 
					initialValues={values}
					renderField={({label, component}) => (
						<div style={{display:'flex',alignItems:'center', marginBottom: '20px'}}>
							{label && <span>{label}</span>}
							<span>{component}</span>
						</div>
					)}
				>
					<Field name="username" >
						<Input style={{width: '200px'}} autoComplete="new-password" placeholder="请输入用户名" />
					</Field>
					<Field name="password" >
						<Input style={{width: '200px'}} autoComplete="new-password" htmlType="password" placeholder="请输入密码"  />
					</Field>
					<Field valueName='checked' label="记住密码：" name="flag" component={Checkbox} />
					<div className={styles.btnWrap}>
						<Button className={styles.btn} loading={loading} type='primary' htmlType="submit">登录</Button>
					</div>
				</Form>
			</div> <
		/div>
	);
}

export default withRouter(UserLogin);