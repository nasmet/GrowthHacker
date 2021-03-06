import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Button,
	Input,
	Loading,
	Select
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import styles from './index.module.scss';

const strategies = [{
	label: '分享',
	value: 'share',
}];

export default function CreateStrategy({
	onOk,
}) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		return () => {
			api.cancelRequest();
		};
	}, []);

	const onSubmit = (e) => {
		setLoading(true);
		console.log(e);
		api.createStrategies(e).then((res) => {
			model.log('创建成功');
			onOk(res);
		}).catch((e) => {
			model.log(e);
			setLoading(false);
		});
	};

	const onReset = (formCore) => {
		formCore.reset();
	};

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
      			<Form
      				onSubmit={onSubmit} 
  					rules={{
  						name:[{
					      required: true,
					      message: '必填'
					    }],
					    view_value: [{
					      required: true,
					      message: '必填'
					    }],
					    ad_value:  [{
					      	required: true,
					     	message: '必填'
					    }],
					    num_value:[{
 							required: true,
					     	message: '必填'
					    }],
					    action:  [{
					      	required: true,
					     	message: '必填',
					    }],
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
		              				placeholder='请输入名字'
		              				maxLength={50}
		              			/>
		      				</Field>

		      				<Field name='view_value'>
								<Select className={styles.input} dataSource={strategies} placeholder='请选择用户界面策略' >
								</Select>
		      				</Field>

		      				<Field name='ad_value'>
								<Select className={styles.input} dataSource={strategies} placeholder='请选择用户广告策略' >
								</Select>
		      				</Field>

		      				<Field name='num_value'>
								<Select className={styles.input} dataSource={strategies} placeholder='请选择用户数值策略' >
								</Select>
		      				</Field>

		      				<Field name='action'>
								<Select className={styles.input} dataSource={strategies} placeholder='请选择执行的动作' >
								</Select>
		      				</Field>

		      				<Field name='desc'>
		  						<Input 
		              				className={styles.input} 
		              				placeholder='请输入描述'
		              				maxLength={50}
		              			/>
		      				</Field>
		      				<div className={styles.btnWrap}>
			          			<Button className={styles.btn} type="primary" htmlType="submit">
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
   		</Loading>
	);
}