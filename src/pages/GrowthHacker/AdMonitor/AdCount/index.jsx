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

export default function AdCount() {
	const [loading, setLoading] = useState(false);
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [date, setDate] = useState('day:0');

	useEffect(() => {
		function getAdCount() {
			setLoading(true);
			api.getAdCount({
				date,
			}).then((res) => {
				const {
					meta,
					data,
				} = res;
				setTitles(meta);
				setTableData(data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getAdCount();

		return () => {
			api.cancelRequest();
		};
	}, [date]);

	const filterChange = (e) => {
		setDate(e);
	};

	const renderTitles = () => {
		return titles.map((item, index) => {
			if (index === 0) {
				return <Table.Column key={index} title={item} dataIndex={index.toString()} lock width={120} />;
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />;
		});
	};

	return (
		<Components.Wrap>
			<Components.Title title='生命周期广告次数' desc='统计每天的新用户在1、2、3、7、14、30的广告累计点击次数' />
			<Components.DateFilter filterChange={filterChange} />
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false} fixedHeader maxBodyHeight={400} >
						{renderTitles()}
					</Table>
				</Loading>
			</IceContainer>
    	</Components.Wrap>
	);
}