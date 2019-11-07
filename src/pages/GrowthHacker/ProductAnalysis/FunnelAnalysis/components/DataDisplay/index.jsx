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
	function assembleStep() {
		const steps = [];
		for (let i = 1, len = meta.length; i < len; i++) {
			const temp = {
				name: meta[i].step_name,
				count: data[i-1].unique_count,
			};
			if (i !== len - 1) {
				temp.rate = utils.transformPercent(data[i].percentage);
			};
			steps.push(temp);
		}

		return {
			totalRate: `${meta[0].step_name}${utils.transformPercent(data[0].percentage)}`,
			steps,
		};
	}

	const renderColumn = (column,value, index, record) => {
		return (
			<div className={styles.source}>
				<span>{record[`unique_count_${column}`]}</span>
				<span style={{color:'#0AA372'}}>{utils.transformPercent(record[`percentage_${column}`])}</span>
			</div>
		);
	}

	const renderTitle = () => {
		const len = meta.length;
		return meta.map((item, index) => {
			if (index === 0) {
				return <Table.Column key={index} title={item.step_name} cell={renderColumn.bind(this, index)} />
			}
			if (index === len - 1) {
				return;
			}
			return <Table.Column key={index} title={item.step_num} cell={renderColumn.bind(this, index)} />
		})

	};

	function assembleData(){
		const temp={};
		data.forEach((item, index)=>{
			temp[`unique_count_${index}`]=item.unique_count;
			temp[`percentage_${index}`]=item.percentage;
		});
		return [temp];
	}

	return (
		<div>
			{
				data.length!==0 && <Steps  {...assembleStep()} />
			}
			<Loading visible={loading} inline={false}>
				<Table dataSource={assembleData()} hasBorder={false} >
				   	{renderTitle()}     		
				</Table>
			</Loading>
		</div>
	);
}