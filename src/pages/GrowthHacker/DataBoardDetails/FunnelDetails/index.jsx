import React, {
	useState,
	useEffect,
} from 'react';
import {
	Table,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Step from './components/Step';

function FunnelDetails({
	location,
}) {
	const boardInfo = location.state.boardInfo;

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, {
		chart_id: boardInfo.id,
		date: boardInfo.date,
		offset: 0,
		limit: config.LIMIT,
	});
	const {
		meta = [],
			data = [],
	} = response;

	function constructStep(meta, data) {
		const arr = [];
		for (let i = 1, len = meta.length; i < len; i += 2) {
			const obj = {
				name: meta[i],
				count: data[i],
			};
			if (i !== len - 1) obj.rate = data[i + 1];
			arr.push(obj);
		}
		return {
			totalRate: `${meta[0]}${data[0]*100}%`,
			steps: arr,
		};
	}

	const renderColumn = (item, value, index, record) => {
		return (
			<div className={styles.source}>
				<span>{record[item+1]}</span>
				<span style={{color:'#0AA372'}}>{(record[item]*100)}%</span>
			</div>
		);
	}

	const renderTitle = () => {
		const arr = [];
		for (let i = 0, len = meta.length; i < len; i += 2) {
			arr.push(<Table.Column key={i} title={meta[i]} cell={renderColumn.bind(this, i)} />);
		}
		return arr;
	};

	const filterChange = (e) => {
		updateParameter(Object.assign({}, parameter, {
			date: e,
			offset: 0,
		}));
	};

	return (
		<Components.Wrap>
			<Components.Title title={boardInfo.name} desc={boardInfo.desc} />
			<IceContainer>
				<Components.DateFilter initTabValue='NAN' initCurDateValue={model.transformDate(boardInfo.date)} filterChange={filterChange} />	
				{data.length !==0 ?
					<Step  {...constructStep(meta, data[0])} /> : null
				}
				<Table loading={loading} dataSource={data} hasBorder={false} >
					{renderTitle()}						   	     		
				</Table>
			</IceContainer>
		</Components.Wrap>
	);
}

export default withRouter(FunnelDetails);