import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';

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
					offset: 0,
					limit: config.LIMIT,
				}
			}).then((res) => {
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

	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	return (
		<Table loading={loading} dataSource={data} hasBorder={false} >
		   	{renderTitle()}     		
		</Table>
	);
}