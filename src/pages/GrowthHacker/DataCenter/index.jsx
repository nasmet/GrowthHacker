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
	Link,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';

const getData = (data) => {
	return [{
		id: 1,
		name: '观看广告',
		event: 'ad_watch',
		type: '计数器',
		createTime: utils.formatUnix(utils.getDate() / 1000, 'Y-M-D'),
		lastUpdateTime: utils.formatUnix(utils.getDate() / 1000, 'Y-M-D'),
	}, {
		id: 2,
		name: '虚拟货币增加',
		event: 'coin_add',
		type: '计数器',
		createTime: utils.formatUnix(utils.getDate() / 1000, 'Y-M-D'),
		lastUpdateTime: utils.formatUnix(utils.getDate() / 1000, 'Y-M-D'),
	}];
};
const {
	Column,
} = Table;
const limit = 10;

function DataCenter({
	history,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	const [filter, setfilter] = useState({
		domain: 0,
	});

	let cancelTask = false; // 防止内存泄露
	useEffect(() => {
		function fetchData() {
			setLoading(true);
			// api.find({
			//  limit,
			//  offset: (curPage - 1) * limit,
			// }).then((res) => {
			//  if (cancelTask) {
			//    return;
			//  }
			//  const {
			//    total,
			//    trends,
			//  } = res;
			//  setCount(total);
			//  setData(getData(trends));
			// }).catch((e) => {
			//  Message.success(e.toString());
			// }).finally(() => {
			//  if (cancelTask) {
			//    return;
			//  }
			//  setLoading(false);
			// });
			setTimeout(() => {
				setData(getData());
				setLoading(false);
			}, 500);
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

	const handle = (e) => {
		history.push({
			pathname: '/growthhacker/eventanalysis',
			state: e,
		});
	};

	const renderCover = (value, index, record) => {
		return (
			<Link style={{ textDecoration: 'none' }} target="_blank" to={{
         		pathname: "/growthhacker/eventanalysis",
         		search: JSON.stringify(record),
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
		console.log(filter);
		setSort({});
		resetPage();
	};

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order,
		});
		resetPage()
	};

	return (
		<div>
			<IceContainer>
				<Filter values={filter} filterChange={filterChange} />
			</IceContainer>

			<IceContainer>
	          	<Table loading={loading} dataSource={data} hasBorder={false} onSort={onSort} sort={sort} >
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
	    </div>
	);
}

export default withRouter(DataCenter);