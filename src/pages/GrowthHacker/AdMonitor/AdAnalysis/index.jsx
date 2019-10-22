import React, {
	Component,
	useState,
	useEffect,
	useRef,
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

	function getAdAnalysis(date = 'day:0') {
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

	useEffect(() => {
		getAdAnalysis();

		return () => {
			api.cancelRequest();
		};
	}, []);

	const filterChange = (e) => {
		getAdAnalysis(e);
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
			<Components.Title title='付费率分析' desc='用户数量，用户占活跃用户比例，平均用户总游戏时长' />
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