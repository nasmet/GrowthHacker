import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Button,
	Loading,
	Table,
	Pagination,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function Rule({
	history,
}) {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);

	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.getDataCenter({
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
				type: 'event',
			}).then((res) => {
				const {
					total,
					event_entities
				} = res;
				setCount(total);
				setTableData(event_entities);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}


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
				api.deleteEvent({
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

	const jumpCreateRule = () => {
		history.push('/thousandfaces/createrule')
	};

	return (
		<Components.Wrap>
      		<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={jumpCreateRule}> 
						新建规则
					</Button>
				</div>
				<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={tableData} 
		          		hasBorder={false}
		          	>	
		          		<Table.Column title="id" dataIndex="id" />
		          		<Table.Column title="名字" dataIndex="name" />
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
    	</Components.Wrap>
	);
}

export default withRouter(Rule);