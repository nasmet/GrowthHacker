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
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';
import Template from '../../DataBoardDetails/Template';

export default function RetentionAnalysis() {
	const refDialog = useRef(null);
	const saveRef = useRef(null);
	const refVariable = useRef({
		values: {},
		name: '',
		date: 'day:0',
	});

	const {
		parameter,
		response,
		loading,
		updateParameter,
	} = hooks.useRequest(api.getDataBoard, {
		chart_id: 0,
		trend: {
			date: '',
		},
	}, false);
	const {
		meta = [],
			data = [],
	} = response;

	useEffect(() => {
		return () => {
			api.cancelRequest();
		};
	}, []);

	const filterChange = (step) => {
		const flag = step.length === 0 ? true : false;
		saveRef.current.setButtonStatus(flag);
		refVariable.current.values = step;
	};

	const tranformData = () => {
		const values = refVariable.current.values;
		return {
			init_event: values[0].values.init_event,
			retention_event: values[1].values.retention_event,
			segmentation_id: values[2].values.segmentation_id,
		}
	};

	const onOk = (sucess, fail) => {
		const temp = tranformData();
		const {
			name,
			date,
		} = refVariable.current;
		api.createBoard({ ...temp,
			name,
			type: 'retention',
			date,
		}).then((res) => {
			model.log('成功添加到看板');
			sucess();
			updateParameter(Object.assign({}, parameter, {
				chart_id: res.id,
			}));
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
			<Components.Save ref={saveRef} title='新建留存分析' onSave={onSave} />

			<IceContainer>
				<Components.DateFilter filterChange={dateChange} />	
				<Filter filterChange={filterChange} />
			</IceContainer>

			<IceContainer style={{minHeight: '600px'}}>	
				<Template 
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