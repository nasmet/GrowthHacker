import React from 'react';
import {
	Button,
	Table,
	Dialog,
	Loading,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function UserGroup({
	history,
}) {
	const {
		showLoading,
		closeLoading,
		updateResponse,
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getUserGroups);
	const {
		segmentations = [],
	} = response;

	const onCreateGroup = () => {
		history.push('/dataanalysis/projectdata/ua/creategroup');
	};

	const onDeleteGroup = (id, index) => {
		Dialog.confirm({
			content: '确认删除吗',
			onOk: () => {
				showLoading();
				api.deleteUserGroup({
					id,
				}).then((res) => {
					segmentations.splice(index, 1);
					updateResponse();
					model.log('删除成功');
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					closeLoading();
				});
			}
		});
	};

	const jumpUserGroupDetails = (record) => {
		history.push({
			pathname: '/dataanalysis/projectdata/ua/usergroupdetails',
			state: {
				data: record,
			}
		});
	};

	const renderLastCell = (value, index, record) => {
		return (
			<div>
				<Button type='primary' style={{marginRight: '6px'}} onClick={jumpUserGroupDetails.bind(this,record)}>查看详情</Button>
				<Button type='primary' warning onClick={onDeleteGroup.bind(this,record.id,index)}>删除</Button>
			</div>
		);
	};

	const onRefresh = () => {
		updateParameter(parameter);
	};

	const handleData = () => {
		return {
			sheetHeader: ['id', '名称'],
			sheetData: segmentations.map(item => ([item.id, item.name])),
		};
	};

	const renderFirstColunm = (value, index, record) => {
		return <span>{index+1}</span>;
	};

	return (
		<Components.Wrap>
			<Components.Title title='用户分群列表' />
			<p>
				<Button type='primary' style={{borderRadius:'10px',marginBottom:'20px'}} onClick={onCreateGroup}>新建分群</Button>
			</p>
			<IceContainer>
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />	
					{segmentations.length > 0 && <Components.ExportExcel fileName='用户分群列表' handle={handleData} />}			
				</div>
				<Loading visible={loading} inline={false}>		
					<Table 
						dataSource={segmentations} 
						hasBorder={false}
					>
						<Table.Column title='id' dataIndex='id' cell={renderFirstColunm} />
						<Table.Column title='名称' dataIndex='name' />
						<Table.Column title='操作' cell={renderLastCell} />
					</Table>
				</Loading>
			</IceContainer>
    	</Components.Wrap>
	);
}

export default withRouter(UserGroup);