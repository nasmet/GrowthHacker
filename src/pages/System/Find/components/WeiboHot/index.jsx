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
	Dialog,
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
			like,
			retweet,
			comment,
			publish_unix,
			source_platform,
			source_url,
		} = item;
		return {
			id,
			context,
			keyword,
			like,
			retweet,
			comment,
			publish_unix: utils.formatUnix(publish_unix, 'Y-M-D h:m:s'),
			source_platform,
			source_url,
		};
	});
};

const {
	Column,
} = Table;
const limit = 10;

function WeiboHot({
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
				console.log(e);
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
		Dialog.alert({
			title: '暂不支持',
		});
	};

	const renderCover = (value, index, record) => {
		return (
			<Button type="primary" onClick={handle.bind(this, record)}>
        		加入监控
      		</Button>
		);
	};

	const renderSource = (value, index, record) => {
		const {
			source_platform,
			source_url,
		} = record;
		return (
			<div className={styles.source}>
				<span>{source_platform}</span>
				<span>{source_url}</span>
			</div>
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
		        <Table stickyHeader loading={loading} dataSource={data} hasBorder={false} onSort={onSort} sort={sort}>
		          	<Column title="热门内容" dataIndex="context" width={800} lock='left'/>
		          	<Column title="热门词" dataIndex="keyword" />
		          	<Column title="点赞" dataIndex="like" sortable />
		          	<Column title="转发" dataIndex="retweet" sortable />
		          	<Column title="评论" dataIndex="comment" sortable />
		          	<Column title="发布时间" dataIndex="publish_unix" sortable width={200} lock  />
		          	<Column title="来源" cell={renderSource} />
		          	<Column title="操作" cell={renderCover}  width={200} lock="right" />
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

export default withRouter(WeiboHot);