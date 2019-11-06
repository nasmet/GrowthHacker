import React, {
	Component,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Button,
	Table,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Condition from './components/Condition';

function RetentionAnalysis({
	location,
	history,
}) {
	const {
		initRequest,
		initSave,
		initTitle,
		initCondition,
		initDate,
		initDateFilter,
		initOrders,
	} = model.initAnalysisData(3, location);

	const [title, setTitle] = useState(initTitle);
	const saveRef = useRef(null);
	const refDialog = useRef(null);
	const refVariable = useRef(Object.assign({
		type: 'retention',
		name: initTitle,
		date: initDate,
		orders: initOrders,
	}, initCondition));

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, refVariable.current, initRequest);
	const {
		meta = [],
			data = [],
			total = 0,
	} = response;

	const conditionChange = (step) => {
		const flag = step.length === 0 ? true : false;
		saveRef.current.setButtonStatus(flag);
		refVariable.current.values = step;
	};

	function assembleParam() {
		if (!refVariable.current.values) {
			return refVariable.current;
		}
		const param = { ...refVariable.current
		};
		delete param.values;
		const values = refVariable.current.values;
		param.init_event = values[0].values.init_event;
		param.retention_event = values[1].values.retention_event;
		param.segmentation_id = values[2].values.segmentation_id;
		return param;
	}

	const onOk = (sucess, fail) => {
		const param = assembleParam();
		api.createBoard(param).then((res) => {
			model.log('成功添加到看板');
			sucess();
			setTitle(refVariable.current.name);
			updateParameter(param);
		}).catch((e) => {
			model.log(e);
			fail();
		});
	};

	const onInputChange = (e) => {
		refVariable.current.name = e;
	};

	const onSave = () => {
		refDialog.current.onShow();
	};

	const dateChange = (e) => {
		refVariable.current.date = e;
	};

	function onRefresh() {
		updateParameter(assembleParam());
	};

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
			<div style={{display: 'flex', flexDirection: 'column'}}>
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

	return (
		<Components.Wrap>
			<Components.Save ref={saveRef} title={title} {...initSave} onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} {...initDateFilter} />	
				<Condition conditionChange={conditionChange} initCondition={initCondition} />
			</IceContainer>

			<IceContainer style={{minHeight: '600px'}}>	
				<div className={styles.btnWrap}>					
					<Components.Refresh onClick={onRefresh} />
					{data.length > 0 && <Components.ExportExcel fileName={title} data={data} meta={meta} type={2} />}
				</div>
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


export default withRouter(RetentionAnalysis);