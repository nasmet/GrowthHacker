import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
	Table,
	Message,
	Loading,
	Pagination,
	Select,
	Balloon,
	Icon,
} from '@alifd/next';
import {
	Form,
	Field,
} from '@ice/form';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function UserTag() {
	const projectId = sessionStorage.getItem(config.PROJECTID);
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);
	const [selectData, setSelectData] = useState([]);
	const refVarible = useRef({
		userTagData: [],
	})

	function findLabel(id) {
		for (let item of refVarible.current.userTagData) {
			if (item.value === id) {
				return item;
			}
		}
		return null;
	}

	function createUserTag(record, value) {
		setLoading(true);
		api.createUserTag({
			id: record.wechat_openid,
			trend: {
				label_id: value.tags,
			}
		}).then((res) => {
			const temp = findLabel(value.tags);
			record.labels.push({
				user_label_id: res.id,
				label_name: temp.label,
				label_id: temp.value,
			});
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	function deleteUserTag(record, labelId, index) {
		setLoading(true);
		api.deleteUserTag({
			openId: record.wechat_openid,
			labelId,
		}).then((res) => {
			record.labels.splice(index, 1);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		function getUsers() {
			setLoading(true);
			api.getUsers({
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
				project_id: projectId,
			}).then((res) => {
				const {
					total,
					users,
				} = res;
				setCount(total);
				setTableData(users);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getUsers();

		return () => {
			api.cancelRequest();
		};
	}, [curPage]);

	useEffect(() => {
		api.getTags().then((res) => {
			refVarible.current.userTagData = res.labels.map(v => {
				return {
					label: v.name,
					value: v.id,
				}
			});
		});
	}, []);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const clickTarget = <Button size='small' style={{borderRadius: '50%'}}>+</Button>;

	const onBalloonVisibleChange = (value, visible) => {
		const values = value.map(v => v.label_id);
		if (visible) {
			const temp = refVarible.current.userTagData.filter(item => !values.includes(item.value));
			setSelectData(temp);
		}
	};

	const onSubmitUserTag = (record, value) => {
		createUserTag(record, value);
	};

	const onDeleteUserTag = (record, labelId, index) => {
		deleteUserTag(record, labelId, index);
	};

	const renderThreeColumn = (value, index, record) => {
		return (
			<div className={styles.tagWrap}>
				{record.labels.map((item,index) => {
					return (
						<div key={item.user_label_id} style={{position:'relative',marginRight: '8px'}}>
							<span className={styles.tag}>{item.label_name}</span>
							<Icon className={styles.close} type='close' size='xs' onClick={onDeleteUserTag.bind(this,record,item.user_label_id,index)} />
						</div>
					)
				})}
				<Balloon trigger={clickTarget} triggerType="click" onVisibleChange={onBalloonVisibleChange.bind(this,record.labels)}>
    				<Form 
    					onSubmit={onSubmitUserTag.bind(this, record)}
    					effects={[
						    {
						      	field: 'tags',
						      	handler: formCore => {
						      		let disabled =false;
						        	if (!formCore.getFieldValue('tags')) {
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
							<Select placeholder='请选择标签' followTrigger dataSource={selectData} style={{width:'200px'}} />
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
      				<Table.Column title='用户id' dataIndex='user_id' lock width={120} />
      				<Table.Column title='用户openid' dataIndex='wechat_openid' lock width={300} />
      				<Table.Column title='用户标签' cell={renderThreeColumn} />
      			</Table>
      			<Pagination
	           		className={styles.pagination}
	            	current={curPage}
	            	total={count}
	            	onChange={pageChange}
	          	/>
      		</IceContainer>
    	</Components.Wrap>
	);
}