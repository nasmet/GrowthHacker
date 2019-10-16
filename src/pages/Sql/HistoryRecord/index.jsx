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

export default function HistoryRecord() {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
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

	const pageChange = (e) => {
		setCurPage(e);
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
		resetPage();
	};

	return (
		<div>
			<IceContainer>
				<div className={styles.title}>
		      		历史记录
		    	</div>
	    	</IceContainer>

	    	<IceContainer>
	    		<Loading visible={loading} inline={false}>
		          	<Table 
		          		dataSource={data} 
		          		hasBorder={false} 
		          		onSort={onSort} 
		          		sort={sort}
		          	>
		            	<Column title="名称" dataIndex="name" sortable />
		            	<Column title="查询" dataIndex="query" sortable />
		            	<Column title="用户" dataIndex="user" sortable />
		            	<Column title="时间" dataIndex="time" sortable />
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