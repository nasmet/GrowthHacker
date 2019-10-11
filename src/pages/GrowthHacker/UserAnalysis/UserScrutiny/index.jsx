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
	Balloon,
	Checkbox,
} from '@alifd/next';
import {
	withRouter,
} from 'react-router-dom';
import IceContainer from '@icedesign/container';
import styles from './index.module.scss';
import Filter from './components/Filter';

function UserScrutiny({
	history,
}) {
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [emptyContent, setEmptyContent] = useState(1);

	useEffect(() => {
		function getUserScrutiny() {
			setLoading(true);
			api.getUserScrutiny({
				limit: config.LIMIT,
				offset: (curPage - 1) * config.LIMIT,
				search,
			}).then((res) => {
				const {
					meta,
					data,
				} = res;
				setEmptyContent(search ? 0 : 1);
				setTitles(meta);
				setTableData(data);
			}).catch((e) => {
				model.log(e);
			}).finally(() => {
				setLoading(false);
			});
		}

		getUserScrutiny();
	}, [curPage, search]);

	const jumpUserDetails = (e) => {
		history.push({
			pathname: '/growthhacker/projectdata/ua/userscrutinydetails',
			state: {
				id: e,
			}
		});
	};

	const renderFirstCell = (value, index, record) => {
		const val = record[1] || '';
		return (
			<span className={styles.user} onClick={jumpUserDetails.bind(this,val)}>{val}</span>
		);
	};

	const renderFourCell = (value, index, record) => {
		const val = record[3] || '';
		return (
			<span>{utils.formatUnix(val,'Y-M-D h:m:s')}</span>
		);
	}

	const renderTitle = () => {
		return titles.map((item, index) => {
			if (index === 1) {
				return <Table.Column key={index} title={item} cell={renderFirstCell} />
			}
			if (index === 3) {
				return <Table.Column key={index} title={item} cell={renderFourCell} />
			}
			return <Table.Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onInputChange = (e) => {
		setCurPage(1);
		setSearch(e);
	};

	return (
		<Components.Wrap>
			<Components.Title title='用户细查' />
      		<Loading visible={loading} inline={false}>
      			<IceContainer>
      				<Input 
      					style={{marginBottom:'20px'}}
						hasClear 
						hint='search' 
						placeholder="请输入openID" 
						onChange={utils.debounce(onInputChange, 500)}
					/>
					<Table 
						dataSource={tableData} 
						hasBorder={false}
						emptyContent={<span>{emptyContent?'暂无数据':'查询结果为空'}</span>}
					>
					    {renderTitle()} 	
					</Table>
				 	<Pagination
		            	className={styles.pagination}
		           		current={curPage}
		            	total={total}
		            	onChange={pageChange}
				    />
			    </IceContainer>
		    </Loading>
    	</Components.Wrap>
	);
}

export default withRouter(UserScrutiny);