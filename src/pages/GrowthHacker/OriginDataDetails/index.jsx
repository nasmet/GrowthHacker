import React, {
	Component,
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
import CreateOriginDataValue from './components/CreateOriginDataValue';

function OriginDataDetails({
	location,
}) {
	const {
		id,
		name,
		value_type,
	} = location.state;

	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [count, setCount] = useState(0);
	const [curPage, setCurPage] = useState(1);
	const [show, setShow] = useState(false);

	useEffect(() => {
		function getOriginDataValues() {
			setLoading(true);
			api.getOriginDataValues({
				id,
				trend: {
					limit: config.LIMIT,
					offset: (curPage - 1) * config.LIMIT,
				}
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

		getOriginDataValues();

		return () => {
			api.cancelRequest();
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onCreateOriginDataValue = () => {
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

	const onDeleteOriginDataValue = (valueId, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteOriginDataValues({
					id,
					valueId,
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
		return (
			<Button type='primary' warning onClick={onDeleteOriginDataValue.bind(this,record.id,index)}> 
				删除
			</Button>
		);
	};

	return (
		<Components.Wrap>
			<Components.Title title={name} />
			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateOriginDataValue}> 
						创建元数据值
					</Button>
				</div>
				<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={tableData} 
		          		hasBorder={false}
		          	>	
		          		<Table.Column title="id" dataIndex="id" />
		            	<Table.Column title="元数据值" dataIndex="value" />
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
				<CreateOriginDataValue onOk={onOk} id={id} value_type={value_type} />
			</Dialog>
    	</Components.Wrap>
	);
}

export default withRouter(OriginDataDetails);