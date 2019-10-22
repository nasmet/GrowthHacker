import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import styles from './index.module.scss';

export default function DataDisplay({
	id,
}) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [titles, setTitles] = useState([]);

	useEffect(() => {
		if (id === '') {
			return;
		}

		function getDataBoard() {
			setLoading(true);
			api.getDataBoard({
				chart_id: id,
				trend: {
					date: ''
				}
			}).then((res) => {
				console.log(res);
				const {
					meta,
					data,
				} = res;
				setTitles(meta);
				setData(data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getDataBoard();

		return () => {
			api.cancelRequest();
		};
	}, [id]);

	const renderColumn = (item, value, index, record) => {
		return (
			<div className={styles.source}>
				<span>{record[item]}</span>
				<span style={{color:'#0AA372'}}>
					{record[1]===0?'0.00%':utils.transformPercent(record[item]/record[1])}
				</span>
			</div>
		);
	}

	const renderTitle = () => {
		return titles.map((item, index) => {
			if (index > 1) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} width={100} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock width={120} />
		});
	};

	return (
		<Table loading={loading} dataSource={data} hasBorder={false} >
		   	{renderTitle()}     		
		</Table>
	);
}