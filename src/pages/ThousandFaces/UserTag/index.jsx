import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Button,
	Table,
	Message,
	Loading,
	Pagination,
	Select,
	Balloon,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function UserTag() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([{
		id: 1,
		nickname: 'aa',
		tag: ['A', 'B', 'C']
	}, {
		id: 2,
		nickname: 'bb',
		tag: ['B', 'C']
	}]);
	const [userTagData, setUserTagData] = useState([]);

	const clickTarget = <Button type='primary' style={{marginBottom: '10px',borderRadius: '50%'}}>+</Button>;

	const onBalloonVisibleChange = (value, visible) => {
		if (visible) {
			const temp = config.UserTags.filter(item => !value.includes(item));
			setUserTagData(temp);
		}
	};

	const onSubmitUserTag = (index, id, value) => {
		setLoading(true);
		setTimeout(() => {
			setTableData(pre => {
				pre[index].tag = pre[index].tag.concat(value.tags);
				return [...pre];
			});
			setLoading(false);
		}, 500);
	};

	const renderThreeColumn = (value, index, record) => {
		return (
			<div className={styles.tagWrap}>
				{record.tag.map((item, index) => {
					return <span key={index} className={styles.tag}>{item}</span>
				})}
				<Balloon trigger={clickTarget} triggerType="click" onVisibleChange={onBalloonVisibleChange.bind(this,record.tag)}>
    				<Form 
    					onSubmit={onSubmitUserTag.bind(this,index,record.id)}
    					effects={[
						    {
						      	field: 'tags',
						      	handler: formCore => {
						      		let disabled =false;
						        	if (formCore.getFieldValue('tags').length===0) {
							    		disabled = true;
						        	}
					          		formCore.setFieldProps('btn', {
										disabled,
									});
						      	}
						    }
						]}
    				>
    					<Field name='tags'>
							<Select placeholder='请选择标签' followTrigger mode='tag' dataSource={userTagData} style={{width:'200px'}} />
						</Field>
						<Field name='btn'>
				            <Button disabled type='primary' htmlType="submit">提交</Button>
				        </Field>
				    </Form>
    			</Balloon>
			</div>
		)
	};

	return (
		<Components.Wrap>
      		<IceContainer>
      			<Table loading={loading} dataSource={tableData} hasBorder={false} >
      				<Table.Column title='用户ID' dataIndex='id' lock width={220} />
      				<Table.Column title='用户名称' dataIndex='nickname' lock width={220} />
      				<Table.Column title='用户标签' cell={renderThreeColumn} />
      			</Table>
      		</IceContainer>
    	</Components.Wrap>
	);
}