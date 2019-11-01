import React, {
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Table,
	Pagination,
	Button,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';

function EventAnalysisDetails({
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
	const initValues = {
		segmentation_id,
		dimensions,
		metrics,
	};

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
		limit: config.LIMIT,
		offset: 0,
	});
	const {
		meta = [],
			data = [],
			total = 0,
	} = response;

	function assemblingChartStyle(meta) {
		return {
			x: meta[0],
			y: 'count',
			color: 'event',
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
						[name]: `${name}${value}`,
						event: meta[index],
						count: v,
					})
				}
			})
		});
		return arr;
	}

	const renderTitle = () => {
		return meta.map((item, index) => {
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		updateParameter(Object.assign({}, parameter, {
			offset: (e - 1) * config.LIMIT,
		}));
	};

	const dateChange = e => {
		updateParameter(Object.assign({}, parameter, {
			date: e,
			offset: 0,
		}));
	};

	const filterChange = (value, flag) => {
		refVariable.current.values = value;
		if (flag !== disabled) {
			setDisabled(flag);
		}
	}

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
				{/*<Button type='primary' disabled={disabled} onClick={onSave}>保存</Button>*/}
			</div>

			<IceContainer>
				<Components.DateFilter initTabValue='NAN' initCurDateValue={model.transformDate(date)} filterChange={dateChange} />	
				<Filter filterChange={filterChange} initValues={initValues} />
			</IceContainer>

			<IceContainer>
				<Components.ChartsDisplay 
					tableData={data}
					loading={loading}
					chartData={assemblingChartData(data, meta)} 
					chartStyle={assemblingChartStyle(meta)}
					renderTitle={renderTitle} 
				/>
				<Pagination
					className={styles.pagination}
					total={total}
					onChange={pageChange}
				/>		      	
			</IceContainer>
			<Components.BoardDialog onInputChange={onInputChange} onOk={onOk} ref={refDialog} />      	
		</Components.Wrap>
	);
}

export default withRouter(EventAnalysisDetails);