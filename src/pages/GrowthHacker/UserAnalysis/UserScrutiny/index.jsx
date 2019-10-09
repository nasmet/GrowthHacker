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

const {
	Column,
} = Table;

function UserScrutiny({
	history,
}) {
	const [titles, setTitles] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [selectValues, setSelectValues] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [emptyContent, setEmptyContent] = useState(1);
	let cancelTask = false;
	const projectId = sessionStorage.getItem('projectId');

	useEffect(() => {
		function getUserScrutiny() {
			setLoading(true);
			api.getUserScrutiny({
				id: projectId,
				trend: {
					limit: config.LIMIT,
					offset: (curPage - 1) * config.LIMIT,
					search,
				}
			}).then((res) => {
				if (cancelTask) {
					return;
				}
				const {
					meta,
					data,
				} = res;
				setEmptyContent(search ? 0 : 1);
				setTitles(meta);
				setTableData(data);
			}).catch((e) => {
				Message.success(e.toString());
			}).finally(() => {
				if (cancelTask) {
					return;
				}
				setLoading(false);
			});
		}

		getUserScrutiny();

		return () => {
			cancelTask = true;
		};
	}, [curPage, search]);

	const filterChange = (e) => {
		console.log(e);
	};

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
				return <Column key={index} title={item} cell={renderFirstCell} />
			}
			if (index === 3) {
				return <Column key={index} title={item} cell={renderFourCell} />
			}
			return <Column key={index} title={item} dataIndex={index.toString()} />
		});
	};

	const lastTitle = () => {
		return (
			<Button className={styles.lastTitle}>
				<Icon className={styles.icon} type='add' size='small'/>
				<span>业务标签</span>
			</Button>
		);
	}

	const onSelectTitleChange = (e) => {
		const increase = [];
		e.forEach((v) => {
			const index = selectTitlesMap[v];
			const {
				label,
				value,
			} = selectTitles[index];

			increase.push({
				key: value,
				name: label,
			});
		});
		setSelectValues(e);
		setTitles((pre) => {
			const clone = [...defaultTitles];
			clone.splice(1, 0, ...increase);
			return [...clone];
		});
	};

	const renderLastTitle = () => {
		return (
			<Balloon 
				trigger={lastTitle()} 
				closable={false}
				align='bl'
				triggerType='click'
				needAdjust
			>	
				<Checkbox.Group 
					itemDirection="ver" 
					dataSource={selectTitles}
					onChange={onSelectTitleChange}
					value={selectValues} 
				/>
			</Balloon>
		);
	}

	const pageChange = (e) => {
		setCurPage(e);
	};

	const onInputChange = (e) => {
		setCurPage(1);
		setSearch(e);
	};

	return (
		<div className={styles.wrap}> 
			<p className={styles.titleWrap}>
				<span className={styles.title}>用户细查</span>
				<Input 
					hasClear 
					hint='search' 
					placeholder="请输入openID" 
					onChange={utils.debounce(onInputChange, 500)}
				/>
			</p>
			{/*
      		<IceContainer>
      			<Filter filterChange={filterChange} />
      		</IceContainer>
      		*/}
      		<Loading visible={loading} inline={false}>
      			<IceContainer>
					<Table 
						dataSource={tableData} 
						hasBorder={false}
						emptyContent={<span>{emptyContent?'暂无数据':'查询结果为空'}</span>}
					>
					    {renderTitle()} 
					    {/*
					    <Column 
					    	title={renderLastTitle()} 
					    	lock='right'
					    	width={150} 
					    /> 
						*/} 		
					</Table>
				 	<Pagination
		            	className={styles.pagination}
		           		current={curPage}
		            	total={total}
		            	onChange={pageChange}
				    />
			    </IceContainer>
		    </Loading>
    	</div>
	);
}

export default withRouter(UserScrutiny);