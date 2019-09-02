import React, {
	Component,
	useEffect,
	useState,
	useRef,
} from 'react';
import {
	withRouter,
} from 'react-router-dom';
import {
	Input,
	Button,
	Checkbox,
	Message,
	Loading,
} from '@alifd/next';
import {
	FormBinderWrapper as IceFormBinderWrapper,
	FormBinder as IceFormBinder,
	FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';

function UserLogin({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [check, setCheck] = useState(false);
	const form = useRef(null);

	useEffect(() => {
		const user = localStorage.getItem(config.ACCOUNT);
		if (username) {
			const psd = localStorage.getItem(config.PASSWORD);
			setUsername(user);
			setPassword(psd);
			setCheck(true);
		}
	}, []);

	const handleCheckbox = (checkbox) => {
		if (checkbox) {
			localStorage.setItem(config.ACCOUNT, username);
			localStorage.setItem(config.PASSWORD, password);
		} else {
			localStorage.removeItem(config.ACCOUNT);
			localStorage.removeItem(config.PASSWORD);
		}
	};

	const submit = () => {
		form.validateAll((errors, values) => {
			if (errors) {
				console.log('errors', errors);
				return;
			}
			setLoading(true);

			api.login({
				username: values.username,
				password: values.password,
			}).then((res) => {
				handleCheckbox(values.checkbox);
				sessionStorage.setItem(config.TOKENKEY, res.token);
				history.push('/');
			}).catch((e) => {
				Message.success(e);
				setLoading(false);
			});
		});
	};

	const checkChange = (e) => {
		setCheck(e);
	};

	return (
		<div className={styles.container}>
      		<h4 className={styles.title}>登 录</h4>
      			<Loading visible={loading}>
        			<IceFormBinderWrapper ref={form} >
          				<div className={styles.formItems}>
            				<div className={styles.formItem}>
              				<IceIcon type="person" size="small" className={styles.inputIcon} />
              				<IceFormBinder name="username" required message="必填">
				                <Input
				                  defaultValue={username}
				                  size="large"
				                  maxLength={20}
				                  placeholder="用户名"
				                  className={styles.inputCol}
				                  hasClear
				                  autoComplete="off"
				                />
              				</IceFormBinder>
              				<IceFormError name="username" />
            			</div>

			            <div className={styles.formItem}>
			               	<IceIcon type="lock" size="small" className={styles.inputIcon} />
			              	<IceFormBinder name="password" required message="必填">
				                <Input
				                  defaultValue={password}
				                  size="large"
				                  htmlType="password"
				                  placeholder="密码"
				                  className={styles.inputCol}
				                  hasClear
				                  autoComplete="off"
				                />
			             	</IceFormBinder>
			             	<IceFormError name="password" />
			            </div>

			            <div className={styles.formItem}>
			              	<IceFormBinder name="checkbox">
			                	<Checkbox className={styles.checkbox} checked={check} onChange={checkChange}>
			                  		记住账号
			                	</Checkbox>
			              	</IceFormBinder>
			            </div>

			            <div className={styles.footer}>
			              	<Button
			                	type="primary"
			                	size="large"
			                	onClick={submit}
			                	className={styles.submitBtn}
			              	>
			                	登 录
			              	</Button>
			            </div>
          			</div>
        		</IceFormBinderWrapper>
      		</Loading>
    	</div>
	);
}

export default withRouter(UserLogin);