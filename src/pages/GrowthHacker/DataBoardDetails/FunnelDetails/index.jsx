import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Table,
	Message,
	Loading
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Step from './components/Step';

const {
	Column
} = Table;

function FunnelDetails({
	location
}) {
	const {
		projectId,
		boardInfo,
	} = location.state;
	const {
		id,
		name,
		desc,
	} = boardInfo;
	const info = [{
		id: 0,
		name: '看板名称',
		value: name
	}, {
		id: 1,
		name: '看板描述',
		value: desc
	}, ];

	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [steps, setSteps] = useState([]);
	const [totalRate, setTotalRate] = useState('');
	let cancelTask = false; // 防止内存泄漏

	function getDataBoard() {
		setLoading(true);
		api.getDataBoard({
			project_id: projectId,
			chart_id: id,
			limit: 20,
			offset: 0,
		}).then((res) => {
			if (cancelTask) return;
			const {
				meta,
				data
			} = res;
			if (data.length === 0) {
				return;
			}
			constructStep(meta, data[0]);
			setTableData(data);
			setTitles(meta);
		}).catch((e) => {
			Message.success(e.toString());
		}).finally(() => {
			if (cancelTask) return;
			setLoading(false);
		});
	}

	useEffect(() => {
		getDataBoard();

		return () => {
			cancelTask = true;
		};
	}, []);

	function constructStep(meta, data) {
		setTotalRate(`${meta[0]}${data[0]*100}%`);
		const arr = [];
		for (let i = 1, len = meta.length; i < len; i += 2) {
			const obj = {
				name: meta[i],
				count: data[i]
			};
			if (i !== len - 1) obj.rate = data[i + 1];
			arr.push(obj);
		}
		setSteps(arr);
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
		for (let i = 0, len = titles.length; i < len; i += 2) {
			arr.push(<Column key={i} title={titles[i]} cell={renderColumn.bind(this, i)} />);
		}
		return arr;
	};

	return (
		<div className={styles.wrap}>
			<Components.Introduction info={info} />
			<Loading visible={loading} inline={false}>
				<Step  totalRate={totalRate} steps={steps} /> 
				<Table dataSource={tableData} hasBorder={false} >
				   	{renderTitle()}     		
				</Table>
			</Loading>
		</div>
	);
}

export default withRouter(FunnelDetails);