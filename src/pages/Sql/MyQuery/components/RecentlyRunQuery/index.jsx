import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function RecentlyRunQuery() {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
	
	}, [curPage]);

	const pageChange = (e) => {
		setCurPage(e);
	};

	return (
		<IceContainer>
			<Loading visible={loading} inline={false}>
	          	<Table 
	          		dataSource={data} 
	          		hasBorder={false} 
	          	>
	            	<Table.Column title="名称" dataIndex="name" />
	            	<Table.Column title="查询" dataIndex="query" />
	            	<Table.Column title="状态" dataIndex="status" />
	            	<Table.Column title="时间" dataIndex="time" />
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