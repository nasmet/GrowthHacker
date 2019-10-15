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

export default function AdRate() {
	const [loading, setLoading] = useState(false);
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [date, setDate] = useState('day:0');

	useEffect(() => {
		function getARPURate() {
			setLoading(true);
			api.getARPURate({
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

		getARPURate();

		return () => {
			api.cancelRequest();
		};
	}, [date]);


	const filterChange = (e) => {
		setDate(e);
	};

	const renderTitles = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock={index>0?false:true} width={120} />;
		});
	};

	return (
		<Components.Wrap>
      		<Components.DateFilter filterChange={filterChange} />
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false} >
						{renderTitles()}
					</Table>
				</Loading>
			</IceContainer>
    	</Components.Wrap>
	);
}