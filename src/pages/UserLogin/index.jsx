import React, {
	Component,
	useState,
	useEffect,
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
	Grid,
	DatePicker,
	Checkbox,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import {
	withRouter,
	Link,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function UserLogin({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});

	useEffect(() => {
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
		setTimeout(() => {
			if (flag) {
				localStorage.setItem(config.ACCOUNT, username);
				localStorage.setItem(config.PASSWORD, password);
			} else {
				localStorage.removeItem(config.ACCOUNT);
				localStorage.removeItem(config.PASSWORD);
			}
			sessionStorage.setItem(config.TOKENKEY, 123);
			history.push('/');
		}, 500);
	};

	return (
		<div className={styles.wrap}>	
			<Loading visible={loading}>
				<Form 
					onSubmit={onLogin} 
					initialValues={values}
					renderField={({label, component, error}) => (
			            <div style={{display:'flex',alignItems:'center', marginBottom: '20px'}}>
			              <div style={{width:'80px'}}>{label}</div>
			              <span>{component}</span>
			            </div>
			        )}
				>
		  			<Field label="用户名：" name="username" >
		  				<Input style={{width: '200px'}} placeholder="请输入用户名" />
		  			</Field>
		  			<Field label="密码：" name="password" >
		  				<Input style={{width: '200px'}} htmlType="password" placeholder="请输入密码"  />
		  			</Field>
		  			<Field valueName='checked' label="记住密码：" name="flag" component={Checkbox} />
					<Field label="">
						<div className={styles.btnWrap}>
							<Button className={styles.btn} type='primary' htmlType="submit">登录</Button>
							<Link to='/user/register'>注册</Link>
						</div>
		      		</Field>
		  		</Form>
	  		</Loading>
  		</div>
	);
}

export default withRouter(UserLogin);