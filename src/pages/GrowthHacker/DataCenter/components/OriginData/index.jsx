import React, {
	useState,
	useEffect,
} from 'react';
import {
	Button,
	Table,
	Loading,
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
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);
	const [show, setShow] = useState(false);

	useEffect(() => {
		function getOriginData() {
			setLoading(true);
			api.getOriginData({
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
			}).then((res) => {
				const {
					data,
					total,
				} = res;
				setCount(total);
				setTableData(data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getOriginData();

		return () => {
			api.cancelRequest();
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onDeleteOriginData = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteOriginData({
					id,
				}).then(() => {
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
		setShow(true);
	};

	const onClose = () => {
		setShow(false);
	};

	const onOk = (value) => {
		setTableData((pre) => {
			pre.splice(0, 0, value);
			return [...pre];
		});
		setShow(false);
	};

	return (
		<Components.Wrap>
			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateOriginData}> 
						创建元数据
					</Button>
				</div>
				<Loading visible={loading} inline={false}>
					<Table 
						dataSource={tableData} 
						hasBorder={false}
					>	
						<Table.Column title="id" dataIndex="id" width={120} />
						<Table.Column title="名称" dataIndex="name" width={120} />
						<Table.Column title="标识符" dataIndex="key" width={120} />
						<Table.Column title="类型" dataIndex="value_type" width={120} />
						<Table.Column title="描述" dataIndex="desc" />
						<Table.Column title="操作" cell={renderCover} />
					</Table>
				</Loading>
				<Pagination
					className={styles.pagination}
					current={curPage}
					total={count}
					onChange={pageChange}
				/>
			</IceContainer>
			<Dialog 
				autoFocus
				visible={show} 
				onClose={onClose}
				footer={false}
			>
				<CreateOriginData onOk={onOk} />
			</Dialog>
		</Components.Wrap>
	);
}

export default withRouter(OriginData);