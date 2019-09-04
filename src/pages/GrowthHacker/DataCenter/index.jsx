import React, {
	Component,
	useState,
	useEffect,
	useRef,
	useContext,
	useCallback,
	useMemo,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Dialog,
} from '@alifd/next';
import {
	withRouter,
	Link,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';
import CreateBuriedPoint from './components/CreateBuriedPoint';

const {
	Column,
} = Table;
const limit = 10;

function DataCenter() {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [filter, setfilter] = useState({
		domain: 0,
	});
	const [show, setShow] = useState(false);
	const [showAnalysisBtn, setShowAnalysisBtn] = useState(false);
	const [showDeleteBtn, setShowDeleteBtn] = useState(false);
	const [rowSelection, setRowSelection] = useState({
		selectedRowKeys: [],
		onChange: onRowSelectionChange,
	});
	let cancelTask = false; // 防止内存泄露
	
	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.getDataCenter({
				limit,
				offset: (curPage - 1) * limit,
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					total,
					list,
				} = res;
				setCount(total);
				setData(list);
			}).catch((e) => {
				Message.success(e.toString());
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		if (curPage > 0) {
			fetchData();
		}

		return () => {
			cancelTask = true;
		};
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	const renderCover = (value, index, record) => {
		const {
			name,
			event,
			type,
		} = record;
		return (
			<Link style={{ textDecoration: 'none' }} target="_blank" to={{
         		pathname: "/growthhacker/eventanalysis",
         		search: `name=${name}&event=${event}&type=${type}`,
        	}}>
      			事件分析
      		</Link>
		);
	};

	function resetPage() {
		if (curPage === 1) {
			setCurPage(0);
		}
		setTimeout(() => {
			setCurPage(1);
		});
	}

	const filterChange = () => {
		resetRowSelection();
		setSort({});
		resetPage();
	};

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order,
		});
		resetPage()
	};

	const onCreateBuriedPoint = () => {
		setShow(true);
	};

	const onOk = (values) => {
		setShow(false);
		setData((pre) => {
			values.id = pre.length + 1;
			values.createTime = '2019-9-4';
			values.lastUpdateTime = '2019-9-4';
			return [values, ...pre];
		})
	};

	const onClose = () => {
		setShow(false);
	};

	function onRowSelectionChange(e) {
		setRowSelection((pre) => {
			pre.selectedRowKeys = e;
			return { ...pre
			};
		});;
		setBtnShow(e.length !== 0);
	}

	function setBtnShow(value) {
		setShowAnalysisBtn(value);
		setShowDeleteBtn(value);
	}

	const onDeleteBuriedPoint = () => {
		setData((pre) => {
			const deletData = [];
			rowSelection.selectedRowKeys.forEach((item) => {
				pre.forEach((v, index) => {
					if (v.id === item) {
						pre.splice(index, 1);
						return;
					}
				})
			});
			return [...pre];
		});
		resetRowSelection();
	};

	function resetRowSelection() {
		setBtnShow(false);	
		setRowSelection((pre) => {
			pre.selectedRowKeys = [];
			return { ...pre
			};
		});
	}

	return (
		<div>
			<IceContainer>
				<Filter values={filter} filterChange={filterChange} />
			</IceContainer>

			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateBuriedPoint}> 
						创建埋点事件
					</Button>
					<Button className={styles.btn} disabled={!showDeleteBtn} type="secondary" onClick={onDeleteBuriedPoint}> 
						删除埋点事件
					</Button>
				</div>
	          	<Table 
	          		loading={loading} 
	          		dataSource={data} 
	          		hasBorder={false} 
	          		onSort={onSort} 
	          		sort={sort}
	          		rowSelection={rowSelection}
	          	>
	            	<Column title="名称" dataIndex="name" />
	            	<Column title="事件名" dataIndex="event" />
	            	<Column title="类型" dataIndex="type" />
	            	<Column title="创建时间" dataIndex="createTime" sortable />
	            	<Column title="最后更新时间" dataIndex="lastUpdateTime" sortable />
	            	<Column title="操作" cell={renderCover} />
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
				<CreateBuriedPoint  onOk={onOk} />
			</Dialog>
	    </div>
	);
}

export default withRouter(DataCenter);