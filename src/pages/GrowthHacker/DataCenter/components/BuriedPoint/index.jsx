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
import CreateBuriedPoint from '../CreateBuriedPoint';

export default function BuriedPoint() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);
	const [show, setShow] = useState(false);

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

		fetchData();
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onDeleteBuriedPoint = (id, index) => {
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
			<Button type='primary' warning onClick={onDeleteBuriedPoint.bind(this, id, index)}> 
				删除
			</Button>
		);
	};

	const onCreateBuriedPoint = () => {
		setShow(true);
	};

	const onClose = () => {
		setShow(false);
	};

	const onOk = (values, cb) => {
		api.createEvent({ ...values,
			entity_type: 'event',
		}).then((res) => {
			if (cancelTask) {
				return;
			}
			setTableData((pre) => {
				pre.splice(0, 0, res.event_entity);
				return [...pre];
			});
			setShow(false);
			model.log('创建成功');
		}).catch((e) => {
			cb();
			model.log(e);
		});
	};

	return (
		<div>
      		<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateBuriedPoint}> 
						创建埋点事件
					</Button>
				</div>

	          	<Table 
	          		loading={loading} 
	          		dataSource={tableData} 
	          		hasBorder={false} 
	          	>	
	          		<Table.Column title="id" dataIndex="id" />
	            	<Table.Column title="名称" dataIndex="name" />
	            	<Table.Column title="标识符" dataIndex="entity_key" />
	            	<Table.Column title="类型" dataIndex="value_type" />
	            	<Table.Column title="描述" dataIndex="desc" />
	            	<Table.Column title="操作" cell={renderCover} />
	          	</Table>

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
				<CreateBuriedPoint onOk={onOk} entityType='event' />
			</Dialog>
    	</div>
	);
}