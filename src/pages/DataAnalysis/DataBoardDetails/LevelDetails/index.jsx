import React, {
	useState,
} from 'react';
import {
	Table,
	Pagination,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

function LevelDetails({
	location,
}) {
	const boardInfo = location.state.boardInfo;
	const {
		parameter,
		response,
		loading,
		updateParameter,
		updateResponse,
	} = hooks.useRequest(api.getDataBoard, {
		chart_id: boardInfo.id,
		date: boardInfo.date,
		offset: 0,
		limit: config.LIMIT,
		type: boardInfo.type,
	});
	let {
		meta = [],
			data = [],
	} = response;
	const [curPage, setCurPage] = useState(1);

	function assemblingChartStyle(meta) {
		return {
			x: meta[0],
			y: 'count',
			color: 'event',
		};
	}

	function assemblingChartData(data, meta) {
		const arr = [];
		data.forEach((item) => {
			const value = item[0];
			const name = meta[0];
			item.forEach((v, index) => {
				if (index !== 0 && meta[index]) {
					arr.push({
						[name]: `${name}${value}`,
						event: meta[index],
						count: v,
					})
				}
			})
		});
		return arr;
	}

	const renderColumn = (item, value, index, record) => {
		return (
			<span>{(record[item]*100).toFixed(2)}%</span>
		);
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			if (index === 3 || index === 6) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} sortable />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} sortable />
		});
	};

	const dateChange = (e) => {
		updateParameter(Object.assign(parameter, {
			date: e,
			offset: 0,
		}));
	};

	const onRefresh = () => {
		updateParameter({ ...parameter
		});
	};

	const onSort = (dataIndex, order) => {
		data.sort((a, b) => order === 'desc' ? b[dataIndex] - a[dataIndex] : a[dataIndex] - b[dataIndex]);
		updateResponse();
	};

	const handleData = () => {
		return {
			sheetHeader: meta,
			sheetData: data,
		};
	};

	const maxBodyHeight = document.body.clientHeight - 400;

	const pageChange = (e) => {
		setCurPage(e);
	};

	function assembleData() {
		const offset = (curPage - 1) * config.LIMIT;
		return data.slice(offset, offset + 10);
	}

	return (
		<Components.Wrap>
			<Components.Title title={boardInfo.name} desc={boardInfo.desc} />
			<Components.DateFilter initTabValue='NAN' initCurDateValue={model.transformDate(boardInfo.date)} filterChange={dateChange} />	
			<IceContainer> 
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName={boardInfo.name} handle={handleData} />}
				</div>
				<Components.ChartsDisplay 
					onSort={onSort}
					tableData={assembleData()}
					loading={loading}
					chartData={assemblingChartData(assembleData(), meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle} 
					fixedHeader
					maxBodyHeight={maxBodyHeight}
				/>
				<Pagination
					current={curPage}
					className={styles.pagination}
					total={data.length}
					onChange={pageChange}
				/>
			</IceContainer>
		</Components.Wrap>
	);
}

export default withRouter(LevelDetails);