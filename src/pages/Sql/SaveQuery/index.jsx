import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Table,
	Loading,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function SaveQuery() {
	const [curPage, setCurPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [count, setCount] = useState(0);

	useEffect(() => {

	}, [curPage]);

	const onInputChange = (e) => {
		console.log(e);
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	return (
    	<IceContainer>
    		<Input className={styles.input} hasClear hint='search' placeholder="搜索查询" onChange={utils.debounce(onInputChange, 500)}/>
    		<Loading visible={loading} inline={false}>
	          	<Table 
	          		dataSource={data} 
	          		hasBorder={false} 
	          	>
	            	<Table.Column title="名称" dataIndex="name" />
	            	<Table.Column title="描述" dataIndex="description" />
	            	<Table.Column title="所有者" dataIndex="owner" />
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