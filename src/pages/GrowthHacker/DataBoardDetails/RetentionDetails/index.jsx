import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Table,
	Button,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';

function RetentionDetails({
	location,
}) {
	const {
		name,
		desc,
		id,
		date,
		segmentation_id,
		metrics,
		dimensions,
	} = location.state.boardInfo;

	const [disabled, setDisabled] = useState(false);
	const refDialog = useRef(null);
	const refVariable = useRef({
		values: {},
		name: '',
		date,
	});

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, {
		chart_id: id,
		date,
	});
	const {
		meta = [],
			data = [],
	} = response;

	function assemblingChartStyle(meta) {
		return {
			x: meta[0],
			y: 'count',
			color: 'event',
			cols: {
				[meta[0]]: {
					type: 'timeCat',
				},
			},
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
						[name]: value,
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
			<div className={styles.source}>
				<span>{record[item]}</span>
				<span style={{color:'#0AA372'}}>
					{record[1]===0?'0.00%':utils.transformPercent(record[item]/record[1])}
				</span>
			</div>
		);
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			if (index > 1) {
				return <Table.Column key={index} title={item} cell={renderColumn.bind(this, index)} width={100} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} lock width={120} />
		});
	};

	const dateChange = (e) => {
		updateParameter(Object.assign({}, parameter, {
			date: e,
		}));
	};

	const filterChange = e => {

	};

	const onInputChange = (e) => {
		refVariable.current.name = e;
	};

	const onSave = () => {
		refDialog.current.onShow();
	};

	const onOk = (success, fail) => {
		// const {
		// 	values,
		// 	date,
		// 	name,
		// } = refVariable.current;
		// api.createBoard({ ...values,
		// 	name,
		// 	type: 'dashboard',
		// 	date,
		// }).then((res) => {
		// 	model.log('成功添加到看板');
		// 	success();
		// 	setBoardId(res.id);
		// }).catch((e) => {
		// 	model.log(e);
		// 	fail();
		// });
	};

	return (
		<Components.Wrap>
			<div className={styles.titleWrap}>
				<Components.Title title={name} desc={desc} />
				<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>
			</div>
			<IceContainer>
				<Components.DateFilter initTabValue='NAN' initCurDateValue={model.transformDate(date)} filterChange={dateChange} />
				{/*<Filter filterChange={filterChange} />*/}
			</IceContainer>
			<IceContainer style={{minHeight: '600px'}}>	
				<Components.ChartsDisplay 
					tableData={data}
					loading={loading}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle}
				/>
			</IceContainer>
			<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />
		</Components.Wrap>
	);
}

export default withRouter(RetentionDetails);