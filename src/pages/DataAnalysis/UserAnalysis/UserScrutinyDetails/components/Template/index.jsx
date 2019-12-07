import React, {
	useState,
	useEffect,
} from 'react';
import {
	Table,
	Loading,
	Pagination,
	Input,
} from '@alifd/next';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function Template({
	openId,
	tab,
}) {
	const [pageSize, setPageSize] = useState(10);
	const [curPage,setCurPage] = useState(1);
	const {
		response,
		loading,
		updateParameter,
		parameter,
	} = hooks.useRequest(api.getUserScrutinyEvents, {
		openId,
		trend: {
			tab,
			limit: config.LIMIT,
			offset: 0,
			date: 'day:0',
			event_key: '',
		},
	});
	const {
		total = 0,
			events = [],
	} = response;

	const pageChange = (e) => {
		setCurPage(e);
		parameter.trend.offset = (e - 1) * pageSize;
		updateParameter({ ...parameter
		});
	};

	const renderTimeColumn = (value, index, record) => {
		const val = record.created_at || '';
		return <span>{utils.formatUnix(val,'Y-M-D h:m:s')}</span>
	};

	const dateChange = date => {
		setCurPage(1);
		parameter.trend.date = date;
		parameter.trend.offset = 0;
		updateParameter({ ...parameter
		});
	};

	const onInputChange = e => {
		setCurPage(1);
		parameter.trend.event_key = e;
		parameter.trend.offset = 0;
		updateParameter({ ...parameter
		});
	};

	const onRefresh = () => {
		setCurPage(1);
		updateParameter(parameter);
	}

	const handleData = () => {
		return {
			sheetHeader: ['id', '事件标识符', '参数列表','事件时间'],
			sheetData: events.map(item => {
				return [item.id, item.event, item.params, utils.formatUnix(item.created_at, 'Y-M-D h:m:s')];
			}),
		};
	};

	function assembleEvents() {
		const exist = {
			created_at: true,
			event: true,
			appid: true,
			wechat_openid: true,
			id: true
		};
		const data = [];
		events.forEach(item => {
			const obj = {};
			let params = '';
			Object.keys(item).forEach(key => {
				if (exist[key]) {
					obj[key] = item[key];
					return;
				}
				if (item[key]) {
					params += `${key}: ${item[key]}，`;
				}
			});
			if (!params) {
				params = '-';
			} else {
				params = params.substr(0, params.length - 1);
			}
			obj.params = params;
			data.push(obj);
		});
		return data;
	}

	const renderFirstCell = (value, index, record) => {
		return <span>{parameter.trend.offset+index+1}</span>;
	};

	const pageSizeChange = e => {
		setPageSize(e);
	};

	useEffect(()=>{
		setCurPage(1);
		parameter.trend.offset = 0;
		parameter.trend.limit = pageSize;
		updateParameter(parameter);
	},[pageSize])

	return (
		<div>
			<Components.DateFilter showTime filterChange={dateChange} />
			<Input   					
				hasClear 
				hint='search' 
				placeholder="请输入事件标识符" 
				onChange={utils.debounce(onInputChange, 1000)}
				style={{marginBottom:'20px'}}
			/>
			<Components.PageSizeSelect filterChange={pageSizeChange} />	
			<IceContainer>	
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
					{events.length > 0 && <Components.ExportExcel fileName='用户细查详情' handle={handleData} />}
				</div>			
				<Loading visible={loading} inline={false}>
		      		<Table 
						dataSource={assembleEvents()} 
						hasBorder={false}
					>
						<Table.Column title='id' cell={renderFirstCell} />
						<Table.Column title='事件标识符' dataIndex='event' />
						<Table.Column title='参数列表' dataIndex='params' />
						<Table.Column title='事件时间' cell={renderTimeColumn} />
					</Table>
				</Loading>
			 	<Pagination
	            	className={styles.pagination}
	            	pageSize={pageSize}
	            	current={curPage}
	            	total={total}
	            	onChange={pageChange}
			    />
	    	</IceContainer>
    	</div>
	);
}