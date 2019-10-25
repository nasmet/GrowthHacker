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
import CreatePlan from './components/CreatePlan';

export default function Plan() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);
	const [show, setShow] = useState(false);

	useEffect(() => {
		function getSchemes() {
			setLoading(true);
			api.getSchemes({
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
			}).then((res) => {
				const {
					total,
					labels,
				} = res;
				setCount(total);
				setTableData(labels);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getSchemes();

		return () => {
			api.cancelRequest();
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onDeletePlan = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteSchemes({
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
			<Button type='primary' warning onClick={onDeletePlan.bind(this, id, index)}> 
				删除
			</Button>
		);
	};

	const onCreatePlan = () => {
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

	const renderThreeColumn = (value, index, record) => {
		return <span>{record.rule.name}</span>;
	}

	const renderFourColumn = (value, index, record) => {
		return <span>{record.strategy.name}</span>;
	};

	return (
		<Components.Wrap>
      		<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreatePlan}> 
						创建方案
					</Button>
				</div>
				<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={tableData} 
		          		hasBorder={false}
		          	>	
		          		<Table.Column title="id" dataIndex="id" />
		          		<Table.Column title="名称" dataIndex="name" />
		            	<Table.Column title="规则" cell={renderThreeColumn} />
		            	<Table.Column title="策略" cell={renderFourColumn} />
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
				<CreatePlan onOk={onOk} />
			</Dialog>
    	</Components.Wrap>
	);
}