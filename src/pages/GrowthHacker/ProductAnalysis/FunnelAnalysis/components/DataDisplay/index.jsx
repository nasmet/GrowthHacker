import React, {
	Component,
	useState,
	useEffect
} from 'react';
import {
	Table,
	Loading
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function DataDisplay({
	id,
}) {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [steps, setSteps] = useState([]);
	const [totalRate, setTotalRate] = useState('0');


	useEffect(() => {
		if (id === '') {
			return;
		}

		function getDataBoard() {
			setLoading(true);
			api.getDataBoard({
				chart_id: id,
				trend: {
					date: '',
				}
			}).then((res) => {
				const {
					meta,
					data
				} = res;
				constructStep(meta, data[0]);
				setData(data);
				setTitles(meta);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}
		getDataBoard();

		return () => {
			api.cancelRequest();
		};
	}, [id]);

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
		setTotalRate(`${data[0]*100}%`);
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

	const renderStep = () => {
		const maxIndex = steps.length - 1;
		return steps.map((item, index) => {
			const {
				name,
				count,
				rate,
			} = item;
			return (
				<div key={index} className={styles.container}>
					<div className={styles.first}>
						<div className={styles.left}>
							<span className={styles.index}>{index+1}</span>
							<span>{name}</span>	
						</div>
						<span>{count}人</span>
					</div>
					{index!==maxIndex?
						<div className={styles.second}>
							<svg data-step="1" width="100" height="44" xmlns="http://www.w3.org/2000/svg">
						      <g>
						        <g fill="none" fillRule="evenodd">
						          <g fill='#EAEFF4' >
						            <polygon points="18,0 82,0 82,20 100,20 50,44 0,20 18,20 " style={{strokeWidth: 1, stroke: 'rgba(0,0,0,0.12)'}}></polygon>
						          </g>
						        </g>
						      </g>
						    </svg>
						 	<span className={styles.rate}>{rate*100}%</span>
					    </div>:null
					}
				</div>
			)
		});
	}

	return (
		<Loading visible={loading} inline={false}>
			{data.length!==0 && <div className={styles.head}>
				<div className={styles.headLeft}>总体转化率:{totalRate}</div>
				<div className={styles.headRight}>
					{renderStep()}
				</div>
			</div>}
			<Table  dataSource={data} hasBorder={false} >
			   	{renderTitle()}     		
			</Table>
		</Loading>
	);
}