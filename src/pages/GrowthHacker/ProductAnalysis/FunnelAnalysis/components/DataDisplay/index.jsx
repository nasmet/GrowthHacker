import React from 'react';
import {
	Table,
	Loading
} from '@alifd/next';
import styles from './index.module.scss';
import Steps from './components/Steps';

export default function DataDisplay({
	meta,
	data,
	loading,
}) {
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
		<div>
			{data.length !==0 ?
				<Steps  {...constructStep(meta, data[0])} /> : null
			}
			<Loading visible={loading} inline={false}>
				<Table dataSource={data} hasBorder={false} >
				   	{renderTitle()}     		
				</Table>
			</Loading>
		</div>
	);
}