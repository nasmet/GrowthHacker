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
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	Column,
} = Table;

function UserGroup({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const projectId = sessionStorage.getItem('projectId');
	let cancelTask = false;

	function getUserGroups() {
		setLoading(true);
		api.getUserGroups({
			project_id: projectId,
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			console.log(res);
			setTableData(res.segmentations);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) {
				return;
			}
			setLoading(false);
		});
	}

	useEffect(() => {
		getUserGroups();
	}, []);

	const onCreateGroup = () => {
		history.push('/growthhacker/projectdata/ua/creategroup');
	};

	const onDeleteGroup = (id, index) => {
		Dialog.confirm({
			content: '确认删除吗',
			onOk: () => {
				setLoading(true);
				api.deleteUserGroup({
					project_id: projectId,
					id,
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setTableData((pre) => {
						pre.splice(index, 1);
						return [...pre];
					});
					Message.success('删除成功');
				}).catch((e) => {
					Message.success(e.toString());
				}).finally(() => {
					if (cancelTask) {
						return;
					}
					setLoading(false);
				});
			}
		});
	};

	const jumpUserGroupDetails = (e) => {
		history.push({
			pathname: '/growthhacker/projectdata/ua/usergroupdetails',
			state: {
				id: e,
			}
		});
	};

	const renderFirstCell = (value, index, record) => {
		const val = record.id;
		return (
			<span className={styles.user} onClick={jumpUserGroupDetails.bind(this,val)}>{val}</span>
		);
	}

	const renderLastCell = (value, index, record) => {
		return (
			<Button onClick={onDeleteGroup.bind(this,record.id,index)}>删除</Button>
		);
	};

	return (
		<div className={styles.wrap}>
			<p className={styles.title}>用户分群列表</p>
			<p>
				<Button style={{borderRadius:'10px'}} onClick={onCreateGroup}>新建分群</Button>
			</p>
			<Table 
				loading={loading} 
				dataSource={tableData} 
				hasBorder={false}
			>
				<Column title='id' cell={renderFirstCell} />
				<Column title='名称' dataIndex='name' />
				<Column title='操作' cell={renderLastCell} />
			</Table>
    	</div>
	);
}

export default withRouter(UserGroup);