import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Pagination,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Result({
	sql,
}) {
	const {
		titles,
		data,
	} = sql;

	const [curPage, setCurPage] = useState(1);
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		const start = (curPage - 1) * config.LIMIT;
		const end = start + config.LIMIT;
		setTableData(data.slice(start, end));
	}, [curPage, sql])

	const renderTitle = () => {
		return titles.map((item, index) => {
			if (index === 0) {
				return <Table.Column key={index} title={item} dataIndex={index.toString()} lock='left' width={120} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} width={120} />
		})
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	return (
		<IceContainer>
			<Table dataSource={tableData} hasBorder={false}>
			    {renderTitle()}       		
			</Table>
		    <Pagination
           		className={styles.pagination}
            	current={curPage}
            	total={data.length}
            	onChange={pageChange}
          	/>
    	</IceContainer>
	);
}