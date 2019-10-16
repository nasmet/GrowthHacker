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
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const {
	Column,
} = Table;
const limit = 10;

export default function SaveQuery() {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [rowSelection, setRowSelection] = useState({
		selectedRowKeys: [],
		onChange: onRowSelectionChange,
	});
	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		function fetchData() {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}

		if (curPage > 0) {
			fetchData();
		}

		return () => {
			cancelTask = true;
		};
	}, [curPage]);

	const onInputChange = (e) => {
		console.log(e);
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	function onRowSelectionChange(e) {
		setRowSelection((pre) => {
			pre.selectedRowKeys = e;
			return { ...pre
			};
		});;
	}

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
		resetPage();
	};

	return (
		<div>
			<IceContainer>
				<div className={styles.title}>
		      		保存的查询
		    	</div>

		    	<Input className={styles.input} hasClear hint='search' placeholder="搜索查询" onChange={utils.debounce(onInputChange, 500)}/>
	    	</IceContainer>

	    	<IceContainer>
	    		<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={data} 
		          		hasBorder={false} 
		          		onSort={onSort} 
		          		sort={sort}
		          		rowSelection={rowSelection}
		          	>
		            	<Column title="名称" dataIndex="name" sortable />
		            	<Column title="描述" dataIndex="description" sortable />
		            	<Column title="所有者" dataIndex="owner" sortable />
		            	<Column title="上次修改" dataIndex="modify" sortable />
		          	</Table>
				</Loading>
	          	<Pagination
	           		className={styles.pagination}
	            	current={curPage}
	            	total={count}
	            	onChange={pageChange}
	          	/>
		    </IceContainer>
	    </div>
	);
}