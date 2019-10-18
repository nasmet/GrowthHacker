import React, {
	Component,
	useEffect,
	useState,
	useRef,
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
}) {
	const [loading, setLoading] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		api.getSqlTable({
			table_schema: 1,
		}).then((res) => {
			console.log(res);
			formRef.current.state.store.setFieldProps('table_name', {
				dataSource: res.tables.map(item => item.name),
			});
		}).catch((e) => {
			model.log(e);
			setLoading(false);
		});

		return () => {
			api.cancelRequest();
		};
	}, []);

	const onFocus = (formCore) => {
		const dataSource = formCore.getFieldProps('column_name').dataSource;
		if (!dataSource) {
			api.getColumns({
				table: formCore.getFieldValue('table_name'),
			}).then((res) => {
				formCore.setFieldProps('column_name', {
					dataSource: res.columns.map(v=>v.name),
				});
			});
		}
	};

	const onSubmit = (e) => {
		setLoading(true);
		api.createOriginData(e).then((res) => {
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

	const notFoundContent = <span>加载中...</span>;

	return (
		<Loading visible={loading} inline={false}>
			<div className={styles.wrap}>
      			<Form
      				onSubmit={onSubmit}
      				ref={formRef} 
  					rules={{
					    name: [{
					      required: true,
					      message: '必填'
					    }],
					    key:  [{
					      	required: true,
					     	message: '必填'
					    }],
					    table_name:  [{
					      	required: true,
					     	message: '必填',
					    }],
					    column_name: [{
					      	required: true,
					     	message: '必填',
					    }],
					    value_type:  [{
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
		      		
	      					<Field name="value_type">
								<Select className={styles.input} placeholder='请输入类型' >
								 	<Select.Option value="integer">整形</Select.Option>
							    	<Select.Option value="float">浮点型</Select.Option>
							    	<Select.Option value="string">字符串</Select.Option>
								</Select>
	      					</Field>
		      				
		      				<Field name='table_name'>
								<Select className={styles.input} placeholder='关联表名' dataSource={[]} showSearch />
							</Field>

							<Field name='column_name'>
								<Select 
									className={styles.input} 
									placeholder='绑定字段' 
									dataSource={[]} 
									showSearch 
									notFoundContent={notFoundContent}
									onFocus={onFocus.bind(this,formCore)}
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