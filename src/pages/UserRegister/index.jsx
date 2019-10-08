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

function UserRegister({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});

	const onRegister = (e) => {
		setTimeout(() => {
			history.goBack();
		}, 500);
	};

	const onBack = () => {
		history.goBack();
	};

	return (
		<div className={styles.wrap}>	
			<Loading visible={loading}>
				<Form 
					onSubmit={onRegister} 
					initialValues={values}
					rules={{
					    username: [{
					      required: true,
					      min: 5,
					      message: '用户名至少5个字符'
					    }],
					    password:  [{
					      required: true,
					      min: 8,
					      message: '密码必填,长度至少8位'
					    }],
					    confirm:  [{
					      required: true,
					      message: '确认密码必填'
					    }]
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
					      }
					    }
					]}
					renderField={({label, component, error}) => (
			            <div style={{position:'relative', display:'flex',alignItems:'center', marginBottom: '10px'}}>
			              <div style={{width:'80px'}}>{label}</div>
			              <span>{component}</span>
			              <div style={{position:'absolute',left:'290px',width:'100px',fontSize:'10px', color: '#ee7893'}}>{error}</div>
			            </div>
			          )}
				>
		  			<Field label="用户名：" name="username" >
		  				<Input style={{width: '200px'}} placeholder="请输入用户名" />
		  			</Field>
		  			<Field label="密码：" name="password" >
		  				<Input style={{width: '200px'}} htmlType="password" placeholder="请输入密码"  />
		  			</Field>
		  			<Field label="确认密码：" name="confirm" >
		  				<Input style={{width: '200px'}} htmlType="password" placeholder="请再次输入密码"  />
		  			</Field>
					<Field label="">
						<div className={styles.btnWrap}>
							<Button className={styles.btn} type='primary' htmlType="submit">注册</Button>
							<Button onClick={onBack}>返回</Button>
						</div>
		      		</Field>
		  		</Form>
	  		</Loading>
  		</div>
	);
}

export default withRouter(UserRegister);