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

export default function ARPUData() {
	const [loading, setLoading] = useState(false);
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);

	function getARPUData(date = 'day:0') {
		setLoading(true);
		api.getARPUData({
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
		getARPUData();

		return () => {
			api.cancelRequest();
		};
	}, []);


	const filterChange = (e) => {
		getARPUData(e);
	};

	const renderSixColumn = (value, index, record) => {
		return <span>{utils.transformPercent(record[6])}</span>
	};

	const renderTitles = () => {
		return titles.map((item, index) => {
			if (index === 6) {
				return <Table.Column key={index} title={item} cell={renderSixColumn} />;
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />;
		});
	};

	return (
		<Components.Wrap>
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