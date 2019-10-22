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

	function getARPUDaily(date = 'day:0') {
		setLoading(true);
		api.getARPUDaily({
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

	useEffect(() => {
		getARPUDaily();

		return () => {
			api.cancelRequest();
		};
	}, []);


	const filterChange = (e) => {
		getARPUDaily(e);
	};

	const renderTitles = () => {
		return titles.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock={index>0?false:true} width={index>0?120:140} />;
		});
	};

	return (
		<Components.Wrap>
      		<Components.DateFilter filterChange={filterChange} />
			<IceContainer>
				<Loading visible={loading} inline={false}>
					<Table dataSource={tableData} hasBorder={false} fixedHeader maxBodyHeight={400}>
						{renderTitles()}
					</Table>
				</Loading>
			</IceContainer>
    	</Components.Wrap>
	);
}