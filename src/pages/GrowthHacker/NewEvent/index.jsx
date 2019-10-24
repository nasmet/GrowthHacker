import React, {
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Loading,
} from '@alifd/next';
import IceContainer from '@icedesign/container';

export default function NewEvent() {
	const appid = sessionStorage.getItem(config.PROJECTAPPID);
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function fetchData() {
			setLoading(true);
			api.getSqlData({
				query: model.sql.eventSql(appid),
			}).then((res) => {
				const {
					columns,
					data,
				} = res;
				setTitles(columns);
				setTableData(data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		fetchData();

		return () => {
			api.cancelRequest();
		};
	}, [appid])

	const renderTitle = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()}/>
		})
	};

	return (
		<Components.Wrap>
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false}>
						{renderTitle()}       		
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}