import React from 'react';
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
		parameter.trend.offset = (e - 1) * config.LIMIT;
		updateParameter({ ...parameter
		});
	};

	const renderTimeColumn = (value, index, record) => {
		const val = record.created_at || '';
		return <span>{utils.formatUnix(val,'Y-M-D h:m:s')}</span>
	};

	const dateChange = date => {
		parameter.trend.date = date;
		updateParameter({ ...parameter
		});
	};

	const onInputChange = e => {
		parameter.trend.event_key = e;
		updateParameter({ ...parameter
		});
	};
	
	const onRefresh=()=>{
		updateParameter(parameter);
	}

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
			<IceContainer>	
				<div className='table-update-btns'>					
					<Components.Refresh onClick={onRefresh} />
				</div>			
				<Loading visible={loading} inline={false}>
		      		<Table 
						dataSource={events} 
						hasBorder={false}
					>
						<Table.Column title='事件名称' dataIndex='name' />
						<Table.Column title='事件标识符' dataIndex='event' />
						<Table.Column title='事件时间' cell={renderTimeColumn} />
					</Table>
				</Loading>
			 	<Pagination
	            	className={styles.pagination}
	            	total={total}
	            	onChange={pageChange}
			    />
	    	</IceContainer>
    	</div>
	);
}