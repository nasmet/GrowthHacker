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

export default function CreateBuriedPoint({
	onOk,
	entityType,
}) {
	const [loading, setLoading] = useState(false);
	const type = entityType === 'event' ? 'value_type' : 'variable_type';

	const onSubmit = (e) => {
		setLoading(true);
		api.createEvent({ ...e,
			entity_type: entityType,
		}).then((res) => {
			model.log('创建成功');
			onOk(res.event_entity);
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
					    name: [{
					      required: true,
					      message: '必填'
					    }],
					    key:  [{
					      	required: true,
					     	message: '必填'
					    }],
					    [type]:  [{
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
		      				{
		      					entityType==='event' && 
		      					<Field name="value_type">
									<Select className={styles.input} placeholder='请输入类型' >
									 	<Select.Option value="counter">计数器</Select.Option>
									</Select>
		      					</Field>
		      				}
		      				{
		      					entityType==='variable' && 
		      					<Field name="variable_type">
									<Select className={styles.input} placeholder='请输入类型' >
									 	<Select.Option value="integer">整形</Select.Option>
								    	<Select.Option value="float">浮点型</Select.Option>
								    	<Select.Option value="string">字符串</Select.Option>
									</Select>
		      					</Field>
		      				}
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