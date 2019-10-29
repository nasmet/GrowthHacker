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
	Input,
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

	function findUserLabel(id, labels) {
		const len = labels.length;
		for (let index = 0; index < len; index++) {
			if (labels[index].user_label_id === id) {
				return index;
			}
		}
		return -1;
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

	function deleteUserTag(record, value) {
		setLoading(true);
		api.deleteUserTag({
			openId: record.wechat_openid,
			labelId: value.tags,
		}).then(() => {
			const index = findUserLabel(value.tags, record.labels);
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

	const onAddBalloonVisibleChange = (value, visible) => {
		const values = value.map(v => v.label_id);
		if (visible) {
			const temp = refVarible.current.userTagData.filter(item => !values.includes(item.value));
			setSelectData(temp);
		}
	};

	const onDeleteBalloonVisibleChange = (value, visible) => {
		if (visible) {
			const temp = value.map(v => {
				return {
					label: v.label_name,
					value: v.user_label_id,
				}
			});
			setSelectData(temp);
		}
	};


	const onAddUserTag = (record, value) => {
		createUserTag(record, value);
	};

	const onDeleteUserTag = (record, value) => {
		deleteUserTag(record, value);
	};

	// const modifyTag = () => {

	// };

	// const editTag = (item, index, record) => {
	// 	return (
	// 		<Balloon
	// 			key={item.user_label_id}
	// 			trigger={<span className={styles.tag}>{item.label_name}</span>}
	// 			triggerType="click"
	// 		>
	// 			<Form
	// 				onSubmit={modifyTag.bind(this, record,index)}
	// 				effects={[
	// 				    {
	// 				      	field: 'tag',
	// 				      	handler: formCore => {
	// 				      		let disabled = false;
	// 				      		const value = formCore.getFieldValue('tag');
	// 				        	if (!value || value === item.label_name) {
	// 					    		disabled = true;
	// 				        	}
	// 			          		formCore.setFieldProps('btn', {
	// 								disabled,
	// 							});
	// 				      	}
	// 				    }
	// 				]}
	// 			>
	// 				<Field name='tag' defaultValue={item.label_name} >
	// 					<Input style={{width: '200px'}} />
	// 				</Field>
	// 				<Field name='btn'>
	// 					<Button disabled type='primary' htmlType="submit">提交</Button>
	// 				</Field>
	// 			</Form>
	// 		</Balloon>
	// 	);
	// };

	const renderThreeColumn = (value, index, record) => {
		return (
			<div className={styles.tagWrap}>
				{record.labels.map((item,index) => {
					return <span key={item.user_label_id} className={styles.tag}>{item.label_name}</span>;
				})}
			</div>
		)
	};

	const renderForm = (cb, record) => {
		return (
			<Form 
				onSubmit={cb.bind(this, record)}
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
		);
	};

	const addTagBtn = (record) => {
		return (
			<Balloon 
				trigger={<Button type='primary' style={{marginRight:'6px'}}>增加标签</Button>}
				triggerType="click"
				onVisibleChange={onAddBalloonVisibleChange.bind(this,record.labels)}>
				{renderForm(onAddUserTag,record)}
			</Balloon>
		);
	};

	const deleteTagBtn = (record) => {
		return (
			<Balloon 
				trigger={<Button type='primary' warning>删除标签</Button>}
				triggerType="click"
				onVisibleChange={onDeleteBalloonVisibleChange.bind(this,record.labels)}>
				{renderForm(onDeleteUserTag,record)}
			</Balloon>
		);
	}

	const renderFourColumn = (value, index, record) => {
		return (
			<div >
				{addTagBtn(record)}
				{deleteTagBtn(record)}
			</div>
		);
	}

	return (
		<Components.Wrap>
      		<IceContainer>
      			<Table loading={loading} dataSource={tableData} hasBorder={false} >
      				<Table.Column title='用户id' dataIndex='user_id' />
      				<Table.Column title='用户openid' dataIndex='wechat_openid' />
      				<Table.Column title='用户标签' cell={renderThreeColumn} />
      				<Table.Column title='操作' cell={renderFourColumn} />
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