import React, {
	useRef,
} from 'react';
import {
	Button,
	Table,
	Pagination,
	Dialog,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateOriginData from './components/CreateOriginData';

function OriginData({
	history,
}) {
	const refDialog = useRef(null);

	const {
		parameter,
		response,
		loading,
		updateParameter,
		updateResponse,
		showLoading,
		closeLoading,
	} = hooks.useRequest(api.getOriginData, {
		limit: config.LIMIT,
		offset: 0,
	});

	const {
		data = [],
			total = 0,
	} = response;

	const pageChange = e => {
		updateParameter(Object.assign({}, parameter, {
			offset: (e - 1) * config.LIMIT,
		}));
	};

	const onDeleteOriginData = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				showLoading();
				api.deleteOriginData({
					id,
				}).then(() => {
					data.splice(index, 1);
					updateResponse();
					model.log('删除成功');
				}).catch((e) => {
					model.log(e);
				}).finally(() => {
					closeLoading();
				});
			},
		});
	};

	const jumpOriginDataDetails = (id, name, value_type) => {
		history.push({
			pathname: '/growthhacker/projectdata/origindatadetails',
			state: {
				id,
				name,
				value_type,
			},
		});
	}

	const renderCover = (value, index, record) => {
		const {
			id,
			value_type,
			name,
		} = record;
		return (
			<div>
				<Button type='primary' style={{marginRight:'10px'}} onClick={jumpOriginDataDetails.bind(this,id,name,value_type)}> 
					查看
				</Button>
				<Button type='primary' warning onClick={onDeleteOriginData.bind(this,id,index)}> 
					删除
				</Button>
			</div>
		);
	};

	const onCreateOriginData = () => {
		refDialog.current.onShow();
	};

	const onOk = (value) => {
		data.splice(0, 0, value);
		updateResponse();
	};

	return (
		<Components.Wrap>
			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateOriginData}> 
						创建元数据
					</Button>
				</div>

				<Table 
					loading={loading}
					dataSource={data} 
					hasBorder={false}
				>	
					<Table.Column title="id" dataIndex="id" width={120} />
					<Table.Column title="名称" dataIndex="name" width={120} />
					<Table.Column title="标识符" dataIndex="key" width={120} />
					<Table.Column title="类型" dataIndex="value_type" width={120} />
					<Table.Column title="描述" dataIndex="desc" />
					<Table.Column title="操作" cell={renderCover} />
				</Table>

				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>
			</IceContainer>

			<CreateOriginData ref={refDialog} onOk={onOk} />
		</Components.Wrap>
	);
}

export default withRouter(OriginData);