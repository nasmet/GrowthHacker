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

export default function RecentQuery({
	sql,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		setData(sql);
	}, [sql]);

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

	const onViewResult = (e, index) => {
		console.log(e);
	};

	const renderCover = (value, index, record) => {
		return (
			<Button type="primary" onClick={onViewResult.bind(this, record, index)}>
        		查看结果
      		</Button>
		);
	};

	return (
		<IceContainer>
			<Loading visible={loading} inline={false}>
	          	<Table 
	          		dataSource={data} 
	          		hasBorder={false} 
	          		onSort={onSort} 
	          		sort={sort}
	          	>	
	            	<Column title="查询" dataIndex="query" sortable />
	            	<Column title="时间" dataIndex="time" sortable />
	            	<Column title="结果" cell={renderCover} />
	          	</Table>
          	</Loading>

          	<Pagination
           		className={styles.pagination}
            	current={curPage}
            	total={count}
            	onChange={pageChange}
          	/>
	    </IceContainer>
	);
}