import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Button,
	Loading,
	Dialog,
	Table,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import CreateStrategy from './components/CreateStrategy';

export default function Strategy() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);
	const [show, setShow] = useState(false);

	useEffect(() => {
		function getStrategies() {
			setLoading(true);
			api.getStrategies({
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
			}).then((res) => {
				const {
					total,
					strategies,
				} = res;
				setCount(total);
				setTableData(strategies);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getStrategies();

		return () => {
			api.cancelRequest();
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onDeleteStrategy = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteStrategies({
					id
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
			},
		});
	};

	const renderCover = (value, index, record) => {
		const {
			id
		} = record;
		return (
			<Button type='primary' warning onClick={onDeleteStrategy.bind(this, id, index)}> 
				删除
			</Button>
		);
	};

	const onCreateStrategy = () => {
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
					<Button className={styles.btn} type="secondary" onClick={onCreateStrategy}> 
						创建策略
					</Button>
				</div>
				<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={tableData} 
		          		hasBorder={false}
		          	>	
		          		<Table.Column title="id" dataIndex="id" />
		          		<Table.Column title="名称" dataIndex="name" />
		            	<Table.Column title="用户界面策略" dataIndex="view_value" />
		            	<Table.Column title="用户广告策略" dataIndex="ad_value" />
		            	<Table.Column title="用户数值策略" dataIndex="num_value" />
		            	<Table.Column title="执行的动作" dataIndex="action_value" />
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
				<CreateStrategy onOk={onOk} />
			</Dialog>
    	</Components.Wrap>
	);
}