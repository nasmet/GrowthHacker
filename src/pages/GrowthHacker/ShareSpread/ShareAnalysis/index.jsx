import React, {
	Component,
	useState,
	useEffect,
} from 'react';
import {
	Input,
	Button,
	Tab,
	Table,
	Message,
	Loading,
	Pagination,
	Icon,
	Dialog,
	Select,
	Grid,
	DatePicker,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';

export default function ShareAnalysis() {
	const [loading, setLoading] = useState(false);
	const [tableData, setTableData] = useState([]);
	const [titles, setTitles] = useState([]);
	const [date, setDate] = useState('day:0');
	const [search, setSearch] = useState('');
	const [emptyContent, setEmptyContent] = useState(1);

	useEffect(() => {
		function getShareAnalysis() {
			setLoading(true);
			api.getShareAnalysis({
				date,
				name: search,
			}).then((res) => {
				setEmptyContent(search ? 0 : 1);
				setTableData(res.data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getShareAnalysis();
	}, [date, search]);

	const filterChange = (e) => {
		setDate(e);
	};

	const renderFiveColumn = (value, index, record) => {
		return `${utils.transformPercent(record.share_reflux_ratio)}`;
	};

	const onInputChange = (e) => {
		setSearch(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title='分享触发分析' />
			<Components.DateFilter filterChange={filterChange} />
			<p>
				<Input 
					hasClear 
					hint='search' 
					placeholder="请输入触发名称" 
					onChange={utils.debounce(onInputChange, 500)}
				/>
			</p>
			<IceContainer>
				<Table 
					loading={loading} 
					dataSource={tableData} 
					hasBorder={false}
					emptyContent={<span>{emptyContent?'暂无数据':'查询结果为空'}</span>}
				>
					<Table.Column title='触发名称' dataIndex='trigger_name' />
					<Table.Column title='分享人数' dataIndex='share_user_count' />
					<Table.Column title='分享次数' dataIndex='share_count' />
					<Table.Column title='分享回流量' dataIndex='share_open_count' />
					<Table.Column title='分享回流比' cell={renderFiveColumn} />
					<Table.Column title='分享新增' dataIndex='new_count' />
				</Table>
			</IceContainer>
    	</Components.Wrap>
	);
}