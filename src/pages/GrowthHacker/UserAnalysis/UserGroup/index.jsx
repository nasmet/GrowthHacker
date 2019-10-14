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

function UserGroup({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);

	function getUserGroups() {
		setLoading(true);
		api.getUserGroups().then((res) => {
			setTableData(res.segmentations);
		}).catch((e) => {
			model.log(e);
		}).finally(() => {
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
					id,
				}).then((res) => {
					setTableData((pre) => {
						pre.splice(index, 1);
						return [...pre];
					});
					model.log('删除成功');
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
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
			<Button type='primary' warning onClick={onDeleteGroup.bind(this,record.id,index)}>删除</Button>
		);
	};

	return (
		<Components.Wrap>
			<Components.Title title='用户分群列表' />
			<IceContainer>
				<Button type='primary' style={{borderRadius:'10px',marginBottom:'20px'}} onClick={onCreateGroup}>新建分群</Button>
				<Loading visible={loading} inline={false}>
					<Table 
						dataSource={tableData} 
						hasBorder={false}
					>
						<Table.Column title='id' cell={renderFirstCell} />
						<Table.Column title='名称' dataIndex='name' />
						<Table.Column title='操作' cell={renderLastCell} />
					</Table>
				</Loading>
			</IceContainer>
    	</Components.Wrap>
	);
}

export default withRouter(UserGroup);