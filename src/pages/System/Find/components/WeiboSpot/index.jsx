import React, {
	Component,
	useEffect,
	useState,
} from 'react';
import {
	Table,
	Pagination,
	Button,
	Message,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

const getData = (data) => {
	return data.map((item) => {
		const {
			id,
			context,
			keyword,
			trend_index,
			total_threads,
			source_platform,
			source_url,
			publish_unix,
		} = item;
		return {
			id,
			context,
			keyword,
			trend_index,
			total_threads,
			publish_unix: utils.formatUnix(publish_unix, 'Y-M-D h:m:s'),
			source: `${source_platform}\n${source_url}`,
		};
	});
};

const {
	Column,
} = Table;
const limit = 10;

function WeiboSpot({
	type,
}) {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);
	const [sort, setSort] = useState({});
	let cancelTask = false; // 防止内存泄露

	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.find({
				limit,
				offset: (curPage - 1) * limit,
				type,
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					total,
					trends,
				} = res;
				setCount(total);
				setData(getData(trends));
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

	const handle = (e) => {
		console.log(e);
	};

	const renderCover = (value, index, record) => {
		return (
			<Button type="primary" onClick={handle.bind(this, record)}>
        		加入监控
      		</Button>
		);
	};

	const onSort = (dataIndex, order) => {
		setSort({
			[dataIndex]: order,
		});
		if (curPage === 1) {
			setCurPage(0);
		}
		setTimeout(() => {
			setCurPage(1);
		});
	};

	return (
		<div>
	      	<IceContainer>
	        	<Table loading={loading} dataSource={data} hasBorder={false} onSort={onSort} sort={sort}>
		          	<Column title="热门内容" dataIndex="context" />
		          	<Column title="热门词" dataIndex="keyword" />
		          	<Column title="热度指数" dataIndex="trend_index" sortable />
		          	<Column title="全网信息" dataIndex="total_threads" sortable />
		          	<Column title="发布时间" dataIndex="publish_unix" sortable />
		          	<Column title="来源" dataIndex="source" />
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

export default withRouter(WeiboSpot);