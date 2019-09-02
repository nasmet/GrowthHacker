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
import Filter from './components/Filter';

const getData = (data) => {
	return [{
		id: 1,
		levels: 0,
		sd: 1000,
		xf: 2000,
	}, {
		id: 2,
		levels: 1,
		sd: 2000,
		xf: 3000,
	}];
};
const {
	Column,
} = Table;
const limit = 10;

function PropConsumption({
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

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order,
		});
		resetPage()
	};

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

	const filterChange = () => {
		console.log(filter);
		setSort({});
		resetPage();
	};


	return (
		<div>
			<IceContainer>
				<Filter values={filter} filterChange={filterChange} />
			</IceContainer>

			<IceContainer>
	          	<Table loading={loading} dataSource={data} hasBorder={false} onSort={onSort} sort={sort} >
	            	<Column title="游戏关卡" dataIndex="levels" sortable />
	            	<Column title="闪电增加_次" dataIndex="sd" sortable />
	            	<Column title="旋风增加_次" dataIndex="xf" sortable />
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

export default withRouter(PropConsumption);