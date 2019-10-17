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

export default function RecentlySavedQuery() {
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
	            	<Table.Column title="描述" dataIndex="description" />
	            	<Table.Column title="上次修改" dataIndex="modify" />
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