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
import CreateBuriedPoint from './components/CreateBuriedPoint';

const {
	Column,
} = Table;
const limit = 10;

function DataCenter({
	projectId,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [show, setShow] = useState(false);
	const [showAnalysisBtn, setShowAnalysisBtn] = useState(false);
	const [showDeleteBtn, setShowDeleteBtn] = useState(false);
	const [rowSelection, setRowSelection] = useState({
		selectedRowKeys: [],
		onChange: onRowSelectionChange,
	});
	const [totalData, setTotalData] = useState([]);
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
					event_entities,
				} = res;
				setCount(total);
				setData(event_entities);
				setTotalData(event_entities);
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

	const onDeleteBuriedPoint = (id, index) => {
		Dialog.confirm({
			content: '确定删除吗？',
			onOk: () => {
				setLoading(true);
				api.deleteEvent({
					id,
				}).then((res) => {
					if (cancelTask) {
						return;
					}
					setData((pre) => {
						pre.splice(index, 1);
						return [...pre];
					});
					Message.success('删除成功');
				}).catch((e) => {
					Message.success(e.toString());
				}).finally(() => {
					if (cancelTask) {
						return;
					}
					setLoading(false);
				});
			},
		});
	};

	const renderCover = (value, index, record) => {
		const {
			id,
		} = record;
		return (
			<div>
				{/*<Button style={{marginRight:'10px'}} type='primary' onClick={onAnalysisBuriedPoint.bind(this,[id])}> 
					事件分析
				</Button>
				*/}
				<Button type='primary' onClick={onDeleteBuriedPoint.bind(this, id, index)}> 
					删除事件
				</Button>
			</div>
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

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order,
		});
		resetPage()
	};

	const onCreateBuriedPoint = () => {
		setShow(true);
	};

	const onOk = (values, cb) => {
		console.log(values);
		api.createEvent(values).then((res) => {
			if (cancelTask) {
				return;
			}
			setData((pre) => {
				pre.splice(0, 0, res.event_entity);
				return [...pre];
			});
			setShow(false);
			Message.success('创建成功');
		}).catch((e) => {
			cb();
			Message.success(e.toString());
		});
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

	const onKeyDeleteBuriedPoint = () => {
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
		setTotalData(data);
		resetRowSelection();
	};

	const onAnalysisBuriedPoint = (e) => {
		window.open(`/growthhacker/eventanalysis?id=${e.join(',')}`);
	};

	function resetRowSelection() {
		setBtnShow(false);
		setRowSelection((pre) => {
			pre.selectedRowKeys = [];
			return { ...pre
			};
		});
	}

	const onInputChange = (e) => {
		if (totalData.length === 0) {
			return;
		}
		if (!e) {
			setData([...totalData]);
		} else {
			setData(() => {
				return [...totalData].filter((item) => {
					return item.entity_key.indexOf(e) !== -1;
				});
			});
		}
	};

	return (
		<div>
			<IceContainer>
				<div className={styles.btnWrap}>
					<Button className={styles.btn} type="secondary" onClick={onCreateBuriedPoint}> 
						创建埋点事件
					</Button>
					{/*
					<Button className={styles.btn} disabled={!showDeleteBtn} type="secondary" onClick={onKeyDeleteBuriedPoint}> 
						一键删除埋点事件
					</Button>
					*/}
					{/*
					<Button className={styles.btn} disabled={!showAnalysisBtn} type="secondary" onClick={onAnalysisBuriedPoint.bind(this,rowSelection.selectedRowKeys)}> 
						一键分析埋点事件
					</Button>
					*/}
					<Input className={styles.input} hasClear hint='search' placeholder="请输入标识符" onChange={utils.debounce(onInputChange, 500)}/>
				</div>

	          	<Table 
	          		loading={loading} 
	          		dataSource={data} 
	          		hasBorder={false} 
	          		onSort={onSort} 
	          		sort={sort}
	          		rowSelection={rowSelection}
	          	>	
	          		<Column title="id" dataIndex="id" />
	            	<Column title="名称" dataIndex="name" />
	            	<Column title="标识符" dataIndex="entity_key" />
	            	<Column title="实体类型" dataIndex="type" />
	            	<Column title="事件类型" dataIndex="value_type" />
	            	<Column title="变量值的类型" dataIndex="variable_type" />
	            	<Column title="描述" dataIndex="desc" />
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
				<CreateBuriedPoint onOk={onOk} />
			</Dialog>
	    </div>
	);
}

export default withRouter(DataCenter);