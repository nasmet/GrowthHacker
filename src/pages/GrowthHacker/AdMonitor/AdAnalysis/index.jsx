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

export default function AdAnalysis() {
	const [loading, setLoading] = useState(false);
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [date, setDate] = useState('day:0');

	useEffect(() => {
		function getAdAnalysis() {
			setLoading(true);
			api.getAdAnalysis({
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

		getAdAnalysis();

		return () => {
			api.cancelRequest();
		};
	}, [date]);

	const filterChange = (e) => {
		setDate(e);
	};

	const renderTwoColumn = (value, index, record) => {
		return <span>{utils.transformPercent(record[2])}</span>
	};

	const renderTitles = () => {
		return titles.map((item, index) => {
			if (index === 2) {
				return <Table.Column key={index} title={item} cell={renderTwoColumn} />;
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />;
		});
	};

	return (
		<Components.Wrap>
			<Components.Title title='付费率分析' />
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