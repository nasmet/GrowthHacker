import React, {
	Component,
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from 'react';
import {
	Table,
	Loading
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Step from '../../../../DataBoardDetails/FunnelDetails/components/Step';

function DataDisplay({
	id,
}, ref) {
	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, {
		chart_id: 0,
		date: '',
	}, false);
	const {
		meta = [],
			data = [],
	} = response;

	useImperativeHandle(ref, () => ({
		fetchData: e => {
			updateParameter(Object.assign({}, parameter, {
				chart_id: e,
			}));
		},
	}));

	function constructStep(meta, data) {
		if (data.length === 0 || meta.length === 0) {
			return;
		}
		const arr = [];
		for (let i = 1, len = meta.length; i < len; i += 2) {
			const obj = {
				name: meta[i],
				count: data[i]
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

	return (
		<IceContainer>
			{data.length !==0 ?
				<Step  {...constructStep(meta, data[0])} /> : null
			}
			<Table loading={loading} dataSource={data} hasBorder={false} >
			   	{renderTitle()}     		
			</Table>
		</IceContainer>
	);
}

export default forwardRef(DataDisplay);