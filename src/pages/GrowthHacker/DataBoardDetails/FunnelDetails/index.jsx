import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Table,
	Loading
} from '@alifd/next';
import {
	withRouter
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Step from './components/Step';

function FunnelDetails({
	location
}) {
	const {
		boardInfo,
	} = location.state;

	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [steps, setSteps] = useState([]);
	const [totalRate, setTotalRate] = useState('');

	function getDataBoard() {
		setLoading(true);
		api.getDataBoard({
			chart_id: boardInfo.id,
			trend: {
				offset: 0,
				limit: config.LIMIT,
			}
		}).then((res) => {
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
			model.log(e);
		}).finally(() => {
			setLoading(false);
		});
	}

	useEffect(() => {
		getDataBoard();
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
			arr.push(<Table.Column key={i} title={titles[i]} cell={renderColumn.bind(this, i)} />);
		}
		return arr;
	};

	return (
		<Components.Wrap>
			<Components.Title title={boardInfo.name} />
			<IceContainer>
				<Loading visible={loading} inline={false}>

					<Step  totalRate={totalRate} steps={steps} /> 
					<Table dataSource={tableData} hasBorder={false} >
					   	{renderTitle()}     		
					</Table>
				</Loading>
			</IceContainer>
		</Components.Wrap>
	);
}

export default withRouter(FunnelDetails);